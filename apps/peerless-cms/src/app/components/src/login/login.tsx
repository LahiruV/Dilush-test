import { FormButton, FormInput, InputWidget } from '@peerless/controls';
import { ReadOnlyProvider, useAuthContext } from '@peerless/providers';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, FormLabel } from 'react-bootstrap';
import { z } from 'zod';
import './login.css';
import { useMutation } from '@tanstack/react-query';
import { getAxiosInstance } from '@peerless/services';
import { useLoginQuery } from '@peerless/queries';
import { useState } from 'react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

const loginSchema = z.object({
  userName: z.string()
    .min(1, { message: 'Name is required' }),
  password: z.string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must contain at least 6 characters' }),
});

export interface Auth {
  userName: string;
  password: string;
}

type FormFields = z.infer<typeof loginSchema>;

export const Login = () => {
  const { handleLogin } = useAuthContext();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const methods = useForm<FormFields>({
    defaultValues: {
      userName: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const { mutateAsync } = useMutation({
    mutationFn: (credencials: Auth) => {
      return useLoginQuery(credencials)
    },
    onSuccess: (data) => {
      // console.log(data);
      if (data && data.data && data.data.tokenResponse && data.data.tokenResponse.jwttoken) {
        localStorage.setItem('token', data.data.tokenResponse.jwttoken);
        localStorage.setItem('refreshToken', data.data.tokenResponse.refreshtoken);
        localStorage.setItem('tokenValidTo', data.data.tokenResponse.validTo);
        localStorage.setItem('originatorEntity', JSON.stringify(data.data.originatorEntity));
        handleLogin();
      }
      else {
        console.log('Invalid credentials!');
      }
      setLoading(false);
    },
    onError: (err) => {
      console.log(err);
      setLoading(false);
    }
  });

  const handleOnSubmit = async (data: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await mutateAsync(data);
    } catch (error) {
      console.log(error);
      setIsError(true);
      methods.reset();
      setError('root', {
        message: 'Email or Password is incorrect',
      });
    }
  };

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='login-page'>
      <div className='login-container'>
        <IntroBlock />
        <div className='content'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              handleOnSubmit({ userName, password });
            }
            }
          >
            <h1>Sign In</h1>
            <Stack spacing={1}>
              <FormLabel htmlFor="name" style={{ fontSize: '16px' }}>Name</FormLabel>
              <Input id='login-name' placeholder="" required sx={{ fontSize: '14px', border: 'none' }} onChange={(e) => setUserName(e.target.value)} color='success' />
              <FormLabel htmlFor="password" style={{ fontSize: '16px' }}>Password</FormLabel>
              <Input id='login-password' placeholder="" type='password' required sx={{ fontSize: '14px', border: 'none' }} onChange={(e) => setPassword(e.target.value)} color='success' />
              {isError && <Typography color='danger' sx={{ fontSize: '12px', textAlign: 'right' }}>Email or Password is incorrect</Typography>}
              <Button id='login-submit' type="submit" color='success' loading={loading} style={{ marginTop: '20px' }} >Login</Button>
            </Stack>
          </form>
        </div>
      </div>
      <div className='login-footer'>© {new Date().getFullYear()} Peerless Foods | Version 1.0.0.3 | API Version 1.0.0.1</div>
    </div>

  );
};

const IntroBlock = () => {
  return (
    <div className='intro'>
      <div>
        <div className='login-h1'>
          <h1>
            Peerless <span>Foods</span> <span className='login-header-sub-2'>CRM</span>
          </h1>
        </div>
        <p className='login-p'>Streamline your workflow with our new CRM, generate leads, profile customers, manage end-user data, identify opportunities, organize call cycles, track activities, and schedule your calendar all in one place!</p>
      </div>
      <div className='hero-image'>
        <img src='assets/images/CRM_Login.jpg' alt='' />
      </div>
    </div>
  );
};
