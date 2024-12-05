import NavBar from './NavBar';
import { Grid, Typography } from '@material-ui/core';

const DashBoard = () => {
  const summary =
    'India, a multilingual nation with over 22 official languages and 1,500 dialects, is rapidly embracing AI to enhance accessibility and inclusivity. NVIDIA, a leading AI innovator, is spearheading these efforts by creating language models tailored to Indian languages. \
  .Nemotron-4 15B, a 15-billion-parameter large multilingual language model trained on 8 trillion text tokens. Nemotron-4 15B demonstrates strong performance when assessed on English, multilingual, and coding tasks: it outperforms all existing similarly-sized open models on 4 out of 7 downstream evaluation \
   areas and achieves competitive performance to the leading open models in the remaining ones.  Tech Mahindra leads with Indus 2.0, a fine-tuned AI model for Hindi and its dialects, unlocking applications in sectors like banking, healthcare, and education. \
   Showcased at the NVIDIA AI Summit, Indus 2.0 exemplifies sovereign AI, focusing on region-specific data to build culturally attuned systems. Indian startups like Sarvam AI and Gnani.ai are leveraging NVIDIA technologies to develop multilingual AI models,' +
    " supporting real-time speech interactions and enterprise solutions. Giants like Flipkart, Zoho, and Ola's Krutrim are also integrating NVIDIA's AI frameworks for enhanced customer experiences." +
    "NVIDIA's cutting-edge tools, such as GPU offloading and LM Studio, enable efficient local hosting of language models, balancing quality and performance. These innovations empower businesses to deliver tailored, AI-driven solutions, accelerating India's digital transformation.";

  const techStack =
    'The project is constructed utilizing a contemporary MERN-like tech stack, which combines MySQL for the database layer to effectively manage structured data, Node.js and Express.js for creating a scalable and reliable back-end API, and React for the front-end user experience. With reusable components, React offers a dynamic and responsive user experience, and Node.js and Express.js offer a smooth server-side environment for managing middleware, routing, and API requests. The relational database management system, MySQL, guarantees dependable data storage and sophisticated querying features. React implementation of Chart.js is used to create the dynamic charts on summary and report pages.';
  return (
    <>
      <Grid
        container
        direction='column'
        alignItems='center'
        style={{ minWidth: '200vh' }}
        sm={6}
      >
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item>
          <div style={{ paddingTop: '70px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Typography
                style={{ paddingBottom: '30px', paddingTop: '20px' }}
                variant='h4'
                component='div'
              >
                Summary
              </Typography>
            </div>
            <div
              style={{
                maxWidth: '900px',
                wordBreak: 'unset',
                paddingBottom: '30px',
                textAlign: 'justify',
                textJustify: 'inter-word',
              }}
            >
              <Typography>{summary}</Typography>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Typography
                style={{ paddingBottom: '30px' }}
                variant='h4'
                component='div'
              >
                Tech Stack
              </Typography>
            </div>
            <div
              style={{
                maxWidth: '900px',
                wordBreak: 'unset',
                paddingBottom: '30px',
                textAlign: 'justify',
                textJustify: 'inter-word',
              }}
            >
              <Typography>{techStack}</Typography>
            </div>
          </div>
        </Grid>
        <Grid item>
          <div style={{ textAlign: 'center' }}>
            <Typography variant='body1'>
              For more insights on large language models and their application
              in Indian languages, check out the following:
            </Typography>
            <Typography variant='body1'>
              <a
                href='https://blogs.nvidia.com/blog/llms-indian-languages/'
                target='_blank'
                rel='noopener noreferrer'
              >
                NVIDIA Blog: LLMs in Indian Languages
              </a>
            </Typography>
            <Typography variant='body1'>
              <a
                href='https://arxiv.org/pdf/2402.16819'
                target='_blank'
                rel='noopener noreferrer'
              >
                Nemotron-4 15B Technical Report
              </a>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default DashBoard;
