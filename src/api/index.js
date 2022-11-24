const baseURL = 'http://localhost:3001/api'
// const baseURL = 'postgres://db_451_books_db_l2v4_user:4RnPpbb109Y1FOxlSgVg67D2AxV2DTRe@dpg-cdumit5a49967v66o8ng-a.oregon-postgres.render.com/db_451_books_db_l2v4'

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
        })
    
        const result = await response.json();
        return result;
    
      } catch (ex) {
        console.log('error gettings user details in API', err)
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
        console.log('error gettings user cart details in API')
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
        console.log("error deleting routine");
      }
  };

  export const updateCart = async (token,id,quantity)=> {
    try {
      const response = await fetch(`${baseURL}/carts/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            quantity,
          }
        })
      })
      
      const result = await response.json();
      return result;  
    } catch(ex) {
      console.log('error updating post')
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
  }
}