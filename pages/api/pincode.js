// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pincodes from '../../pincode.json'

export default function handler(req, res) {
  try {
    res.status(200).json(pincodes)
    
  } catch (error) {
    console.log("Some error accured");
  }

  }
  