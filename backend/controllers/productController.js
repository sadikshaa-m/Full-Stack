//req.params.id => req bhaneko request of client .. req.params means the parameter sent in the URL ... req.paarams.id means  the value of the id part in URL.


import fs from 'fs';
import Product, { brands, categories } from '../models/Product.js';

//Database queries take time, so we use await inside an async function to wait until data is fetched.

//filtering getproducts bata garni ho 
export const getProducts = async(req, res) => {
  try {
    //brand matra chaiyo bhane find ko bhitra ({brand: 'samsung'}) lekhni not just a brand title, rating sabai garni find ma value halera ho -- multiple pani garna milcha brand, title..
    //find -- array ma aucha
    //findOne -- euta matra product aucha object ma
    //select -- find pachi .select add garera -- find bata product ko sabai detail aucha tara if u dont want every detail just a title and price of the product then you use select..
     //  const products= await Product.find({}).select('title price');
    //sort -- arrange garna help garcha alphabetically, numerically...
    // const products= await Product.find({}).sort({price: -1});
    //search garna regex use garni find ma
    //limit 
    //skip -- arko page ma jada kam lagcha product skip garera
    //const products= await Product.find({}).limit(4).skip(4);


    //-------------------------------------
    //---stock greater than 8 chaiyo bhane find({stock: {$gt: 8}});  --mongoose operators
    //and, or, nor, not ma use array find({$and [{price: {$gt: 500}}, {rating: {$lt: 4}}]})

    const exludedFields = ['page', 'limit', 'sort', 'fields', 'skip', 'search'];
    let queryObj = { ...req.query };

    exludedFields.forEach((val) => {
      delete queryObj[val];
    })



    if (req.query.search) {
      const searchText = req.query.search;


      if (categories.some((name) => name.toLowerCase() === searchText.toLowerCase())) {
        queryObj.category = { $regex: searchText, $options: 'i' };

      } else if (brands.some((name) => name.toLowerCase() === searchText.toLowerCase())) {
        queryObj.brand = { $regex: searchText, $options: 'i' };
      } else {
        queryObj.title = { $regex: searchText, $options: 'i' };
      }


    }

    // { 'rating[gt]': '4' }
    // {rating: {$gt: 4}}
    const output = Object.entries(queryObj).reduce((acc, [key, value]) => {
      const match = key.match(/^(.+)\[(.+)\]$/);  // <-- FIXED REGEX
      if (match) {
        const field = match[1];
        const operator = `$${match[2]}`;
        const parsedValue = isNaN(value) ? value : Number(value);

        acc[field] = { [operator]: parsedValue };
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
    console.log("OUTPUT:", output);

    let query = Product.find(output);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * 10;

    const total = await Product.countDocuments();
    const products = await query.skip(skip).limit(limit);

    return res.status(200).json({
      status: 'success',
      total,
      products,
      totalPages: Math.ceil(total / limit)
    });







  } catch (err) {
    return res.status(400).json({
      status: 'Error',
      data: err.message
    });
  }
}




export const getProduct = async(req, res) => {
  
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product) {
      return res.status(404).json({
        status: 'error',
        data: 'Product not found'
      })
    };
    return res.status(200).json({
      status: 'success',
      data: product
    });

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      data: err.message
    })
  }
};


// export const createProduct = async (req, res) => {
//    console.log('BODY:', req.body);
//   console.log('FILES:', req.files);
  
//   const {title, price, detail, brand, category} = req.body ?? {};
// const image = req.imagePath;
//   console.log(image);
// //file move garna mv--move
//   // const file = req.files.image;
//   // file.mv(`./uploads/${file.name}`, (err)=> {

//   // })


//   try {
//     await Product.create({
//      title,
//      detail,
//      brand,
//      category,
//      image,
//      price
//     });
//     return res.status(201).json({
//       status: 'success',
//       data: 'product successfully added'
//     })

//   } catch (err) {
//     fs.unlink(`./uploads/${req.imagePath}`, (error) => {
//       return res.status(400).json({
//         status: 'Error',
//         data: err.message
//       });
//     });
//   }
// };



export const createProduct = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);

  try {
    const { title, price, detail,stock, brand, category } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const file = req.files.image;
    const imageName = Date.now() + "-" + file.name;
    const uploadPath = `./uploads/${imageName}`;

    // Move file
    await file.mv(uploadPath);

    // Save to DB
    await Product.create({
      title,
      detail,
      brand,
      category,
      stock,
      price,
      image: imageName, // store filename
    });

    return res.status(201).json({
      status: "success",
      data: "product successfully added",
    });
  } catch (err) {
    console.log("ERROR:", err.message);
    return res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
};



export const updateProduct = async (req, res) => {
  const {id} = req.params;
  const { title, price, detail,stock, category, brand } = req.body ?? {};

  try {
    const isExist = await Product.findById(id);
    if (!isExist) {
      if (req.imagePath) {
        fs.unlinkSync(`./uploads/${req.imagePath}`);
        return res.status(404).json({ status: 'error', data: 'product not found' });
      } else {
        return res.status(404).json({ status: 'error', data: 'product not found' });
      }
    }


    isExist.title = title || isExist.title;
    isExist.price = price || isExist.price;
    isExist.stock = stock || isExist.stock;
    isExist.detail = detail || isExist.detail;
    isExist.category = category || isExist.category;
    isExist.brand = brand || isExist.brand;

    //updating file
    if (req.imagePath) {
      fs.unlink(`./uploads/${isExist.image}`, async (err) => {
        isExist.image = req.imagePath;
        await isExist.save();
        return res.status(200).json({
          status: 'success',
          data: 'product successfully updated'
        });

      })

    } else {
      await isExist.save();
      return res.status(200).json({
        status: 'success',
        data: 'product successfully updated'
      });
    }




  //err auda pani delete the image
  } catch (err) {
    if (req.imagePath) {
      fs.unlink(`./uploads/${req.imagePath}`, (error) => {
        return res.status(500).json({
          status: 'error',
          data: err.message
        });
      })
    } else {
      return res.status(500).json({
        status: 'error',
        data: err.message
      });
    }

  }



}




export const deleteProduct = async(req, res) => {
   try {
    const {id}=req.params;
    const isExist = await Product.findById(id);
    if (!isExist) return res.status(404).json({ status: 'error', data: 'product not found' });


    fs.unlink(`./uploads/${isExist.image}`, async (err) => {

      await isExist.deleteOne();
      return res.status(200).json({ status: 'success', data: 'product deleted successfully' })
    });
  }catch (err) {
    console.log(err)
    return res.status(500).json({
        status: 'error',
        data: err.message
      });
  }
};