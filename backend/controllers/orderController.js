import Order from "../models/Orders.js";


export const getorder = async(req, res) => {
  const {id} = req.params;
  try{
    const order = await Order.findById(id).populate([
      {
        path: 'products.productId',
        model: 'Product'
      }
    ]);
    return res.status(200).json({
      status: 'success',
      order
    });
  } catch (err){
    return res.status(500).json({
      status: 'error',
      message: err.message
    })
  }
} 




export const getOrders = async (req, res) => {

  try {
    //admin le request gareko cha bhane sabai detail pathauni, user le request gareko cha bhane usle matra order gareko pathauni
    if (req.role === 'admin') {
      const orders = await Order.find({}).populate([
        {
          path: 'products.productId',
          model: 'Product'
        },
        {
          path: 'userId',
          model: 'User',
          //select ma password audaina aba
          select: '-password'
        }
      ]);
      return res.status(200).json({
        status: 'success',
        orders
      });

    } else {


      const orders = await Order.find({ userId: req.userId }).populate([
        {
          path: 'products.productId',
          model: 'Product'
        }
      ]);
      return res.status(200).json({
        status: 'success',
        orders
      })

    }


  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    })
  }

}





export const createOrder = async (req, res) => {
    const { totalAmount, products } = req.body ?? {};
    try {
        await Order.create({
            totalAmount,
            userId: req.userId,
            products
        });
        return res.status(201).json({
            status: 'success',
            message: 'order created successfully'
        })

    } catch (err) {
        console.log('Error:', err.message);
        return res.status(500).json({
            status: 'Error',
            message: err.message
        })

    }
}