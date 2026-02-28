// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PostTable from '../components/PostTable';
import Navbar from '../components/Navbar';
import CreateTaskModal from '../components/CreateTaskModal';
import { Container, Typography, Box, Button, Paper, Grid, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { enqueueSnackbar } from 'notistack';

export default function Dashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      const postsData = data.data || data || [];
      setPosts(postsData);
      
      // محاسبه آمار
      setStats({
        total: postsData.length,
        published: postsData.filter(p => p.isPublished).length,
        draft: postsData.filter(p => !p.isPublished).length
      });
    } catch (error) {
      enqueueSnackbar('Failed to fetch tasks', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleTaskCreated = (newTask) => {
    if (newTask) {
      const updatedPosts = [...posts, newTask];
      setPosts(updatedPosts);
      setStats({
        total: updatedPosts.length,
        published: updatedPosts.filter(p => p.isPublished).length,
        draft: updatedPosts.filter(p => !p.isPublished).length
      });
      enqueueSnackbar('Task created successfully', { variant: 'success' });
    }
  };

  const handleTaskDeleted = (deletedId) => {
    const updatedPosts = posts.filter(post => post._id !== deletedId);
    setPosts(updatedPosts);
    setStats({
      total: updatedPosts.length,
      published: updatedPosts.filter(p => p.isPublished).length,
      draft: updatedPosts.filter(p => !p.isPublished).length
    });
  };

  const handleTaskUpdated = (updatedTask) => {
    const updatedPosts = posts.map(post => 
      post._id === updatedTask._id ? updatedTask : post
    );
    setPosts(updatedPosts);
    setStats({
      total: updatedPosts.length,
      published: updatedPosts.filter(p => p.isPublished).length,
      draft: updatedPosts.filter(p => !p.isPublished).length
    });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #141a1a 0%, #1a2222 100%)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h3" sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #fff 0%, #00ff88 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}>
                Task Tracker
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Welcome back, <span style={{ color: '#00ff88', fontWeight: 'bold' }}>{user?.username || user?.phoneNumber}</span>
              </Typography>
            </Box>
            
            {user?.role === 'admin' && (
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => setOpenModal(true)}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #00ff88 30%, #00cc6a 90%)',
                  color: '#000',
                  fontWeight: 'bold',
                }}
              >
                Create Task
              </Button>
            )}
          </Box>
        </Paper>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #141a1a 0%, #1a2222 100%)',
              borderLeft: '4px solid #00ff88'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Total Tasks
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#00ff88' }}>
                      {stats.total}
                    </Typography>
                  </Box>
                  <AssignmentIcon sx={{ fontSize: 48, color: '#00ff88', opacity: 0.5 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #141a1a 0%, #1a2222 100%)',
              borderLeft: '4px solid #4dffaa'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Published
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#4dffaa' }}>
                      {stats.published}
                    </Typography>
                  </Box>
                  <CheckCircleIcon sx={{ fontSize: 48, color: '#4dffaa', opacity: 0.5 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #141a1a 0%, #1a2222 100%)',
              borderLeft: '4px solid #ffb74d'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Drafts
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#ffb74d' }}>
                      {stats.draft}
                    </Typography>
                  </Box>
                  <PendingIcon sx={{ fontSize: 48, color: '#ffb74d', opacity: 0.5 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tasks Table */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#00ff88' }}>
            Tasks List
          </Typography>
          <PostTable 
            posts={posts} 
            setPosts={setPosts}
            onDelete={handleTaskDeleted}
            onUpdate={handleTaskUpdated}
            loading={loading}
          />
        </Paper>
      </Container>

      <CreateTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onTaskCreated={handleTaskCreated}
      />
    </>
  );
}