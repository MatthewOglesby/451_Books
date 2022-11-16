const baseURL = 'http://localhost:3001/api'

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${baseURL}/products`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const results = await response.json();

        return results;
    } catch(ex) {
        console.error('Error getting all products', ex)
    }
}

export const registerUser = async (email, username, password) => {
    try {
      console.log(email, username, password)
      const response = await fetch(`${baseURL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password
        })
      })
  
      const result = await response.json();
    //   console.log(result)
      return result;
  
    } catch (error) {
      console.error(error)
    }
  }

export const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${baseURL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })
  
      const result = await response.json();

      return result;
    } catch (ex) {
      console.log(error)
    }
  }

export const getUser = async (token) => {
    try {
      const response = await fetch(`${baseURL}/users/:id`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
  
      const result = await response.json();
      return result;
  
    } catch (ex) {
      console.log('error gettings user details')
    }
  }