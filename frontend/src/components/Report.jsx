import { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from './BarChart';
import NavBar from './NavBar';
import { Grid, Typography, List, ListItem, ListItemText, Paper, Box, Card, CardContent } from '@material-ui/core';
import {jwtDecode} from 'jwt-decode';

const Report = (props) => {
  const [resultsData, setResultsData] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const token = localStorage.getItem('jwtToken');
    if (
      !(token && jwtDecode(token) && jwtDecode(token).exp > Date.now() / 1000)
    ) {
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const resp = await axios.get('http://localhost:3001/api/summarydata');
      console.log(resp);
      if (resp && resp.status === 200) {
        let data = resp.data ?? [];
        const results = data.reduce((result, entry) => {
          if (!result[entry.model_name]) {
            result[entry.model_name] = {};
          }
          result[entry.model_name][entry.category] = entry.accuracy;
          return result;
        }, {});
        console.log(results);
        setResultsData(results);
      }
    }
  };

  return (
    <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
      <Grid container direction='column' spacing={4}>
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item>
          <Card elevation={2} style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant='h5' align='center' gutterBottom>
                Model Performance Report
              </Typography>
              <Typography variant='body2' align='center'>
                A detailed breakdown of model performance across various evaluation categories.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item style={{ paddingTop: '30px' }}>
          <Box>
            <BarChart
              reportData={resultsData}
              aria-label='Bar chart showing the performance summary of models'
            />
          </Box>
        </Grid>
        <Grid item>
          <Card elevation={1} style={{ padding: '20px', backgroundColor: '#ffffff' }}>
            <CardContent>
              <Typography variant='h6'>Description</Typography>
              <Typography variant='body1' style={{ marginTop: '10px' }}>
                This chart visualizes the performance of various models across key evaluation categories. Each bar represents the accuracy percentage of a model in a specific category, highlighting strengths and areas of focus.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card elevation={1} style={{ padding: '20px', backgroundColor: '#ffffff' }}>
            <CardContent>
              <Typography variant='h6'>Key Insights</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary='Models perform differently across categories, reflecting their strengths in specialized areas like reasoning, multilingual tasks, or code generation.'
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary='The bar chart provides a comparative view, enabling easy identification of the top-performing models for specific use cases.'
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary='This detailed breakdown supports informed decision-making when selecting models for domain-specific applications.'
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card elevation={1} style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            <CardContent>
              <Typography variant='h6' align='center'>
                Additional Resources
              </Typography>
              <Box style={{ textAlign: 'center', marginTop: '10px' }}>
                <Typography variant='body2'>
                  For more insights on large language models and their application in Indian languages, check out the following:
                </Typography>
                <Typography variant='body2' style={{ marginTop: '10px' }}>
                  <a
                    href='https://blogs.nvidia.com/blog/llms-indian-languages/'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='NVIDIA Blog: LLMs in Indian Languages'
                  >
                    NVIDIA Blog: LLMs in Indian Languages
                  </a>
                </Typography>
                <Typography variant='body2' style={{ marginTop: '5px' }}>
                  <a
                    href='https://arxiv.org/pdf/2402.16819'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Nemotron-4 15B Technical Report PDF'
                  >
                    Nemotron-4 15B Technical Report
                  </a>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Report;
