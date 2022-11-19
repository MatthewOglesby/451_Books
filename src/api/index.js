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
  } catch (ex) {
    console.error('Error getting all products', ex)
  }
}

export const getAllUsers = async () => {
  try {
      const response = await fetch(`${baseURL}/users`, {
          headers: {
              'Content-Type': 'application/json',
          }
      });
      const results = await response.json();

      return results;
  } catch(ex) {
      console.error('Error getting all users', ex)
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
    } catch (err) {
      console.log(err)
    }
  }


export const getUserDetails = async (token) => {
  // console.log('Testing Token in API: ', token)
    try {
      const response = await fetch(`${baseURL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      body: JSON.stringify({
        title: title,
        description: description,
        author: author,
        pageCount: pageCount,
        genre: genre,
        price: price,
        image: image,
        quantity: quantity
      })
  })
      const result = await response.json();
      
      return result;
  
    } catch (ex) {
      console.log('error gettings user details in API')
    }
}

export const updateProduct = async (token, { title, description, author, pageCount, genre, price, image, quantity }) => {
  try {
    const response = await fetch(`${baseURL}/products/:productId`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title,
        description: description,
        author: author,
        pageCount: pageCount,
        genre: genre,
        price: price,
        image: image,
        quantity: quantity
      })
    })
    const result = await response.json();

    return result;
  }
  catch (err) {
    console.error('updateProduct-api FAILED:', err);
  }
}

export const createProduct = async (token, {title, description, author, pageCount, genre, price, image, quantity}) => {
  try {
      const response = await fetch (`${baseURL}/products`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      body: JSON.stringify({
        title: title,
        description: description,
        author: author,
        pageCount: pageCount,
        genre: genre,
        price: price,
        image: image,
        quantity: quantity
      })
  })
      const result = await response.json();
      
      return result;
  }
  catch (err) {
      console.error('createProduct-api FAILED:', err)
  }
}