import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSendMessageMutation } from '../../store/api/portfolioApi';
import { ContactFormData } from '../../types';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export default function ContactForm() {
  const [sendMessage, { isLoading, isSuccess, error }] = useSendMessageMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendMessage(data).unwrap();
      reset();
    } catch {}
  };

  if (isSuccess) return (
    <div className="text-center py-12 px-8 bg-surface border border-accent/20">
      <div className="text-4xl mb-4">✓</div>
      <h3 className="font-display font-bold text-2xl text-accent mb-2">Message sent!</h3>
      <p className="text-muted">I'll get back to you soon.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label className="block font-mono text-[11px] text-accent tracking-[0.12em] uppercase mb-2">Name *</label>
        <input {...register('name')} className="w-full px-4 py-3.5 bg-surface border border-border/20 text-white font-body text-[13px] outline-none transition-colors placeholder:text-muted focus:border-accent" placeholder="Your name" />
        {errors.name && <p className="text-red-400 font-mono text-[11px] mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block font-mono text-[11px] text-accent tracking-[0.12em] uppercase mb-2">Email *</label>
        <input {...register('email')} type="email" className="w-full px-4 py-3.5 bg-surface border border-border/20 text-white font-body text-[13px] outline-none transition-colors placeholder:text-muted focus:border-accent" placeholder="you@email.com" />
        {errors.email && <p className="text-red-400 font-mono text-[11px] mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block font-mono text-[11px] text-accent tracking-[0.12em] uppercase mb-2">Subject *</label>
        <input {...register('subject')} className="w-full px-4 py-3.5 bg-surface border border-border/20 text-white font-body text-[13px] outline-none transition-colors placeholder:text-muted focus:border-accent" placeholder="What's this about?" />
        {errors.subject && <p className="text-red-400 font-mono text-[11px] mt-1">{errors.subject.message}</p>}
      </div>
      <div>
        <label className="block font-mono text-[11px] text-accent tracking-[0.12em] uppercase mb-2">Message *</label>
        <textarea {...register('message')} rows={5} className="w-full px-4 py-3.5 bg-surface border border-border/20 text-white font-body text-[13px] outline-none transition-colors placeholder:text-muted focus:border-accent resize-none" placeholder="Tell me about your project or opportunity..." />
        {errors.message && <p className="text-red-400 font-mono text-[11px] mt-1">{errors.message.message}</p>}
      </div>
      {error && <p className="text-red-400 font-mono text-[12px]">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={isLoading} className="w-full px-12 py-4 bg-accent text-bg font-mono text-[14px] font-semibold border-none cursor-pointer transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px] hover:shadow-accent disabled:opacity-60 disabled:cursor-not-allowed">
        {isLoading ? 'Sending...' : 'Say Hello →'}
      </button>
    </form>
  );
}
