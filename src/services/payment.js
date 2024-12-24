import api from './apiConfig.js';
import { useMutation } from 'react-query';
//import { useNavigate } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';



export const usePayStripe = () => {
   
    const payUsingString = async (data) => {
      try {
        const response = await api.post("/payment/create-payment-link", data );
        return response.data;
      } catch (error) {
        throw new Error('Failed to add shipping address');
      }
    };
  
    return useMutation(payUsingString)
    }