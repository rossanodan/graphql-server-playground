import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

export const getCoursesData = async () => {

  try {
    const response = await axios({
      method: 'get',
      url: `https://www.udemy.com/api-2.0/courses/`,
      withCredentials: false,
      auth: {
        username: process.env.UDEMY_CLIENT_ID,
        password: process.env.UDEMY_CLIENT_SECRET,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      },
    });
    return response.data.results;
  } catch (err) {
    console.error(err);
  }
};
