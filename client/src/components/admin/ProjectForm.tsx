import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAddProjectMutation, useUpdateProjectMutation } from '../../store/api/portfolioApi';
import { Project } from '../../types';

const schema = z.object({
  title:           z.string().min(2,'Title required'),
  description:     z.string().min(10,'Description min 10 chars').max(500),
  longDescription: z.string().max(2000).optional(),
  liveUrl:         z.string().url('Must be valid URL').optional().or(z.literal('')),
  githubUrl:       z.string().url('Must be valid URL').optional().or(z.literal('')),
  category:        z.enum(['Full-Stack','Frontend','Backend','Mobile','AI/ML','Open Source','Other']),
  status:          z.enum(['live','draft','archived']),
  featured:        z.boolean(),
  order:           z.number().min(0),
});
type FormData = z.infer<typeof schema>;

interface Props { project?: Project; onDone: () => void; }

export default function ProjectForm({ project, onDone }: Props) {
  const [techStack, setTechStack] = useState<string[]>(project?.techStack || []);
  const [techInput, setTechInput]   = useState('');
  const [add,  { isLoading: adding  }] = useAddProjectMutation();
  const [upd,  { isLoading: updating }] = useUpdateProjectMutation();
  const isEdit = !!project;

  const { register, handleSubmit, reset, formState:{errors} } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      longDescription: project?.longDescription || '',
      liveUrl: project?.liveUrl || '',
      githubUrl: project?.githubUrl || '',
      category: project?.category || 'Full-Stack',
      status: project?.status || 'live',
      featured: project?.featured || false,
      order: project?.order || 0,
    },
  });

  const addTech = () => {
    const v = techInput.trim();
    if (v && !techStack.includes(v)) setTechStack(p=>[...p,v]);
    setTechInput('');
  };

  const onSubmit = async (data: FormData) => {
    const payload = { ...data, techStack };
    try {
      if (isEdit) await upd({ id: project!._id, body: payload }).unwrap();
      else await add(payload).unwrap();
      onDone();
    } catch {}
  };

  const FI = 'w-full px-4 py-3 bg-surface2 border border-border/20 text-white font-body text-[13px] outline-none transition-colors placeholder:text-muted focus:border-accent';
  const FL = 'block font-mono text-[11px] text-accent tracking-[0.12em] uppercase mb-2';
  const FE = 'text-red-400 font-mono text-[11px] mt-1';

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-5"
      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={FL}>Title *</label>
          <input {...register('title')} className={FI} placeholder="SaaS Analytics Dashboard" />
          {errors.title && <p className={FE}>{errors.title.message}</p>}
        </div>
        <div>
          <label className={FL}>Category *</label>
          <select {...register('category')} className={FI + ' appearance-none'}>
            {['Full-Stack','Frontend','Backend','Mobile','AI/ML','Open Source','Other'].map(c=>(
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={FL}>Short Description * (max 500)</label>
        <textarea {...register('description')} rows={3} className={FI + ' resize-none'} placeholder="What does this project do? Mention scale and outcome." />
        {errors.description && <p className={FE}>{errors.description.message}</p>}
      </div>

      <div>
        <label className={FL}>Long Description (case study)</label>
        <textarea {...register('longDescription')} rows={4} className={FI + ' resize-none'} placeholder="Full case study — problem, solution, results, key decisions." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={FL}>Live URL</label>
          <input {...register('liveUrl')} className={FI} placeholder="https://demo.example.com" />
          {errors.liveUrl && <p className={FE}>{errors.liveUrl.message}</p>}
        </div>
        <div>
          <label className={FL}>GitHub URL</label>
          <input {...register('githubUrl')} className={FI} placeholder="https://github.com/you/repo" />
          {errors.githubUrl && <p className={FE}>{errors.githubUrl.message}</p>}
        </div>
      </div>

      <div>
        <label className={FL}>Tech Stack</label>
        <div className="flex gap-2">
          <input value={techInput} onChange={e=>setTechInput(e.target.value)}
            onKeyDown={e=>{ if(e.key==='Enter'){e.preventDefault();addTech();}}}
            className={FI + ' flex-1'} placeholder="Type a technology and press Enter" />
          <button type="button" onClick={addTech}
            className="px-4 py-3 bg-accent text-bg font-mono text-[12px] font-semibold hover:opacity-90 transition-opacity">
            Add
          </button>
        </div>
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {techStack.map(t=>(
              <motion.span key={t} initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}}
                className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border/20 font-mono text-[12px] text-muted">
                {t}
                <button type="button" onClick={()=>setTechStack(p=>p.filter(x=>x!==t))}
                  className="text-red-400 hover:text-red-300 text-[14px] leading-none">×</button>
              </motion.span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className={FL}>Status</label>
          <select {...register('status')} className={FI + ' appearance-none'}>
            <option value="live">Live</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div>
          <label className={FL}>Order</label>
          <input {...register('order',{valueAsNumber:true})} type="number" min={0} className={FI} />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-3 cursor-pointer">
            <input {...register('featured')} type="checkbox"
              className="w-4 h-4 accent-accent" />
            <span className="font-mono text-[12px] text-muted">Mark as featured</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-border/20">
        <button type="submit" disabled={adding||updating}
          className="px-8 py-3 bg-accent text-bg font-mono text-[13px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
          {adding||updating ? 'Saving...' : (isEdit ? 'Update Project' : 'Create Project')} →
        </button>
        <button type="button" onClick={onDone}
          className="px-6 py-3 border border-border/20 text-muted font-mono text-[13px] hover:border-red-500/40 hover:text-red-400 transition-all">
          Cancel
        </button>
      </div>
    </motion.form>
  );
}
