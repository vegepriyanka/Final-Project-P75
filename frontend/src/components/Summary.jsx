import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { Grid, ListItemText, Typography, makeStyles } from '@material-ui/core';
import PieChart from './PieChart';
import { jwtDecode } from 'jwt-decode';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
  },
  container: {
    maxWidth: '800px',
    width: '100%',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(4),
  },
  pieChartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(4, 0),
  },
  pieChart: {
    width: '300px',
    height: '300px',
  },
  listContainer: {
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2),
  },
  footer: {
    marginTop: theme.spacing(4),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const Summary = (props) => {
  const classes = useStyles();
  const [summaryData, setSummaryData] = useState({});

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
      const hostname = window.location.hostname;
      const resp = await axios.get(`https://final-project-p75-backend.onrender.com/api/reportdata`);
      if (resp && resp.status === 200) {
        const data = resp.data ?? [];
        const summaryData = data.reduce((acc, item) => {
          acc[item.category] = item.percentage;
          return acc;
        }, {});
        setSummaryData(summaryData);
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <NavBar />
        <div className={classes.pieChartContainer}>
          <PieChart
            summaryData={summaryData}
            aria-label='Pie chart showing the input summary of models'
            className={classes.pieChart}
          />
        </div>
        <div className={classes.listContainer}>
        <Grid>
          <List component='div'>
            <ListItem>
              <ListItemText
                primary='Description'
                secondary='Figure 2 presents the distribution of English-language data sources used to pre-train Nemotron-4 15B. These include a blend of web documents, news articles, scientific papers, books, and other curated datasets.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Key Insights'
                secondary={
                  <ul>
                    <li>
                      70% of the model's pre-training dataset is composed of English-language data, emphasizing the model's focus on general-purpose applications.
                    </li>
                    <li>
                      The data composition reflects an effort to include diverse domains, ensuring robust performance across tasks requiring different types of knowledge.
                    </li>
                    <li>
                      This curated dataset contributes to the model's competitive edge in English language benchmarks and downstream evaluations.
                    </li>
                  </ul>
                }
              />
            </ListItem>
          </List>
        </Grid>
        </div>
        <div className={classes.footer}>
          <Typography variant='body1'>
            For more insights on large language models and their application in Indian languages, check out the following:
          </Typography>
          <Typography variant='body1'>
            <a
              href='https://blogs.nvidia.com/blog/llms-indian-languages/'
              target='_blank'
              rel='noopener noreferrer'
              className={classes.link}
              aria-label='NVIDIA Blog: LLMs in Indian Languages'
            >
              NVIDIA Blog: LLMs in Indian Languages
            </a>
          </Typography>
          <Typography variant='body1'>
            <a
              href='https://arxiv.org/pdf/2402.16819'
              target='_blank'
              rel='noopener noreferrer'
              className={classes.link}
              aria-label='Nemotron-4 15B Technical Report PDF'
            >
              Nemotron-4 15B Technical Report
            </a>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Summary;
