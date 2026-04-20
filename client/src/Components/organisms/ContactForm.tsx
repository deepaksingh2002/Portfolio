import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Spinner from '../atoms/Spinner';
import { Button } from '../atoms';
import { useToast } from '../../hooks/useToast';

/**
 * Contact form schema.
 */
const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

type ContactFormValues = z.infer<typeof ContactSchema>;

/**
 * Contact form with animated success state.
 */
export const ContactForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
  });
  const toast = useToast();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const onSubmit = async (data: ContactFormValues) => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      await axios.post('/api/contact/contact', data, { withCredentials: true });
      toast.show('Message sent!', 'success');
      setIsSuccess(true);
      reset();
    } catch (e: any) {
      toast.show(e?.response?.data?.message || 'Failed to send message', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="space-y-5 max-w-lg mx-auto bg-white dark:bg-neutral-900 p-8 rounded-lg shadow"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          className="input"
          {...register('name')}
          disabled={isLoading}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          className="input"
          type="email"
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block mb-1 font-medium">Subject</label>
        <input
          className="input"
          {...register('subject')}
          disabled={isLoading}
        />
        {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
      </div>
      <div>
        <label className="block mb-1 font-medium">Message</label>
        <textarea
          className="input"
          rows={5}
          {...register('message')}
          disabled={isLoading}
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
      </div>
      <Button type="submit" variant="primary" disabled={isLoading || isSubmitting}>
        {isLoading ? <Spinner size="sm" /> : 'Send'}
      </Button>
      {isSuccess && (
        <div className="text-green-600 text-center mt-2 animate-bounce">
          Thank you! Your message has been sent.
        </div>
      )}
    </form>
  );
};
