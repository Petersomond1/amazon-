import multer from 'multer';


// configure multer to store file in memory
const storage = multer.memoryStorage();

//file filter for images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'), false);
    }
}

//initialize multer with memory storage
const upload = multer({ storage, fileFilter});

//custom middleware to inegrate multer with express
const uploadSingle = (req, res, next) => {
    const multermiddleware = upload.single('image');
    multermiddleware(req, res, (err) => {
        if (err) {
          return  res.status(400).json({ message: err.message });
        }
    next();
    })
}

export default uploadSingle;