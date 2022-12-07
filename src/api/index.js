const baseURL = 'https://four51-books.onrender.com/api'
// 'https://four51-books.onrender.com/api'

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
    throw ex;
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
      throw ex;
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
    console.error(error);
    throw error;
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
      console.log(err);
      throw err;
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
        })
    
        const result = await response.json();
        return result;
    
      } catch (ex) {
        console.log('error getting user details in API', ex)
        throw ex;
      }
  
  }

export const updateProduct = async (token, { id, title, description, author, pageCount, genre, price, image, quantity }) => {
  try {
    const response = await fetch(`${baseURL}/products/${id}`, {
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
    throw err;
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
      throw err
  }
}
  export const getUserCart = async (token, userId) => {
      try {
        const response = await fetch(`${baseURL}/users/cart/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
    
        const result = await response.json();
        return result;
    
      } catch (ex) {
        console.log('error getting user cart details in API',ex)
        throw ex;
      }
    }

export const deleteCartItem = async (token, id) => {
      try {
        const response = await fetch(`${baseURL}/carts/${id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const results = await response.json();
        console.log(results);
        return results;
      } catch (ex) {
        console.log("error deleting cart item",ex);
        throw ex;
      }
  };

  export const updateCart = async (token,order_quantity,id)=> {
   
    try {
      const response = await fetch(`${baseURL}/carts/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
          order_quantity
        )
      })
      
      const result = await response.json();
      return result;  
    } catch(ex) {
      console.log('error updating cart items',ex)
      throw ex;
    }
  }

export const addProductToCart = async ( productId, userId) => {
  try {
    const response = await fetch(`${baseURL}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: productId,
        userId: userId
      })
    }); 
    const results = await response.json();
    console.log(results)
    return results;
  } catch (ex) {
    console.log('error adding product to cart', ex)
    throw ex;
  }
}

export const deleteProduct = async (token, id) => {
  try {
    const response = await fetch(`${baseURL}/products/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const results = await response.json();
    console.log(results);
    return results;
  } catch (ex) {
    console.log("error deleting product",ex);
    throw ex;
  }
};