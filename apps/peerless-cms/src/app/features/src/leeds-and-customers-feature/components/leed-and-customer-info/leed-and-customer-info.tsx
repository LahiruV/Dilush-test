import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateDetails } from '@peerless-cms/store';
import { FormInput, FormButton } from '@peerless/controls';
import { ReadOnlyProvider } from '@peerless/providers';
import { Alert, Button } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const LeedAndCustomerInfoSchema = z.object({
  name: z.string().min(1, { message: 'Email must be a valid Name' }),
  title: z.string().min(2, { message: 'Password must contain at least 6 characters' }),
});

type FormFields = z.infer<typeof LeedAndCustomerInfoSchema>;

function LeedAndCustomerInfo() {
  const { selectedLeedOrCustomer, readonly } = useSelector((state: RootState) => state.leedsAndCustomers);
  const dispatch = useDispatch();
  
  const methods = useForm<FormFields>({
    defaultValues: {
      name: selectedLeedOrCustomer.name,
      title: selectedLeedOrCustomer.id,
    },
    resolver: zodResolver(LeedAndCustomerInfoSchema),
  });
  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const handleOnSubmit = async (data: unknown) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // handleLogin(); // Implement Login. This is a mock function
      // throw new Error('Login failed');
    } catch (error) {
      methods.reset();
      setError('root', {
        message: 'Email or Password is incorrect',
      });
    }
  };

  return (
    <ReadOnlyProvider readOnly={readonly} section='leedAndCustomerForm'>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <FormProvider {...methods}>
          {errors.root && <Alert variant='danger'>Email or Password is incorrect</Alert>}
          <FormInput label='Name' name='name' />
          <FormInput label='Title' name='title' />
          <FormButton label='Update Details' name='login' />

          {!readonly && (
            <Button onClick={() => dispatch(updateDetails(true))} variant='outline-dark'>
              Cancel
            </Button>
          )}
        </FormProvider>
      </form>
    </ReadOnlyProvider>
  );
}

export default LeedAndCustomerInfo;
