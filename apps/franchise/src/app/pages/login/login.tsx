import { Mail, Lock, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { CustomButton, InputField } from '@lib/ui';
// import CustomButton from '../../components/common/CustomButton';
// import InputField from '../../components/common/InputField';
// import { useAuth } from '../../context/AuthContext';
// import { getApiUrl } from '../../utils/api';

// Interface for login form data
interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  //   const { setUser, loading, setLoading, setIsAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  //   const handleLogin: SubmitHandler<LoginFormData> = async (data) => {
  //     try {
  //       setLoading(true);
  //       const res = await axios.post(
  //         getApiUrl('/api/protected/auth/login'),
  //         data,
  //         { withCredentials: true }
  //       );

  //       if (res?.data?.access) {
  //         toast.success('Access Granted');
  //         navigate('/');
  //         setUser(true);
  //         setIsAuth(true);
  //       } else {
  //         toast.error('Terminal access denied');
  //       }
  //     } catch (error: any) {
  //       console.error('Login error:', error);
  //       if (error.response?.status === 401) {
  //         toast.error('Invalid credentials');
  //       } else {
  //         toast.error('Connection failed');
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <section className="relative flex w-full h-screen overflow-hidden bg-white">
      {/* Sticky Brand Header */}
      <div className="absolute top-8 left-8 z-[100] md:top-12 md:left-12 animate-in fade-in duration-1000">
        <div className="w-[140px] md:w-[160px]">
          <img
            src="/login-logo.png"
            alt="Dishto"
            className="object-contain w-full"
          />
        </div>
      </div>

      <div className="flex w-full h-full">
        {/* Main Form Area */}
        <div className="relative flex w-full lg:w-[45%] items-start justify-center px-6 xl:px-24 z-10 bg-white shadow-[20px_0_40px_rgba(0,0,0,0.01)] pt-48 lg:pt-40">
          <div className="w-full max-w-[440px]">
            {/* Header Section */}
            <div className="mb-10 text-center animate-reveal stagger-1 lg:text-left">
              <h1 className="font-playfair text-3xl md:text-4xl font-black text-[#121212] tracking-tighter mb-4">
                Sign In
              </h1>
              <p className="max-w-sm mx-auto text-lg font-medium leading-relaxed text-gray-400 lg:mx-0">
                Enter your credentials to access the secure management
                dashboard.
              </p>
            </div>

            {/* Form Section */}
            <form
              // onSubmit={handleSubmit(handleLogin)}
              className="space-y-8 animate-reveal stagger-2"
            >
              <div className="space-y-6">
                <InputField
                  id="email"
                  type="email"
                  label="Administrator Email"
                  placeholder="admin@dishto.com"
                  labelClassName="text-[11px]  font-black uppercase tracking-[0.2em] text-[#121212] opacity-50 mb-3"
                  className="h-16 rounded-2xl! border-none bg-gray-50/50 px-5 text-base transition-all duration-500 focus:bg-white  focus:ring-4 focus:ring-orange/25"
                  containerClassName="shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ring-1 ring-gray-100 focus-within:ring-orange/5 transition-all duration-500 rounded-2xl"
                  icon={<Mail size={22} className="text-gray-300" />}
                  iconPosition="left"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  error={errors.email?.message}
                />

                <InputField
                  id="password"
                  type="password"
                  label="Security Password"
                  placeholder="••••••••••••"
                  labelClassName="text-[11px] font-black uppercase tracking-[0.2em] text-[#121212] opacity-50 mb-3"
                  className="h-16 rounded-2xl! border-none bg-gray-50/50 px-5 text-base transition-all duration-500 focus:bg-white  focus:ring-4 focus:ring-orange/25"
                  containerClassName="shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ring-1 ring-gray-100 focus-within:ring-orange/5 transition-all duration-500 rounded-2xl"
                  icon={<Lock size={22} className="text-gray-300" />}
                  iconPosition="left"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Minimum 6 characters',
                    },
                  })}
                  error={errors.password?.message}
                />
              </div>

              <div className="pt-4 space-y-6">
                <CustomButton
                  // label={loading ? 'Verifying Access...' : 'Enter Dashboard'}
                  label={'Enter Dashboard'}
                  bgColor="bg-[#121212]"
                  textColor="text-white"
                  className="h-16 w-full rounded-2xl! text-[13px] font-black uppercase tracking-[0.25em] transition-all duration-500 hover:bg-orange hover:shadow-[0_20px_40px_-10px_rgba(234,106,18,0.3)] active:scale-[0.98] shadow-2xl"
                  // disabled={loading}
                />

                <div className="flex items-center justify-center gap-3 opacity-20 animate-pulse">
                  <ShieldCheck size={14} className="text-[#121212]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#121212]">
                    Encrypted Session
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Visual Experience Area */}
        <div className="hidden lg:block relative flex-1 h-full bg-[#f9fafb] overflow-hidden border-l border-gray-100">
          <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-br from-orange/10 via-transparent to-orange/5" />

          <div className="image-grid-container h-full w-full origin-center scale-[1.2] rotate-12 transform opacity-[0.85] animate-slow-zoom">
            <div className="grid h-full grid-cols-3 gap-8 p-8">
              {/* Column 1 */}
              <div className="flex flex-col gap-8 animate-scroll-up">
                {[
                  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=600&fit=crop',
                  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
                  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=700&fit=crop',
                  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=500&fit=crop',
                ]
                  .concat([
                    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=700&fit=crop',
                    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=500&fit=crop',
                  ])
                  .map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt=""
                      className="w-full rounded-2xl object-cover shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] ring-1 ring-white/20"
                    />
                  ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-8 pt-16 animate-scroll-down">
                {[
                  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=500&fit=crop',
                  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=650&fit=crop',
                  'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=400&fit=crop',
                  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=600&fit=crop',
                ]
                  .concat([
                    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=500&fit=crop',
                    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=650&fit=crop',
                    'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=600&fit=crop',
                  ])
                  .map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt=""
                      className="w-full rounded-2xl object-cover shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] ring-1 ring-white/20"
                    />
                  ))}
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-8 pt-32 animate-scroll-up">
                {[
                  'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=400&fit=crop',
                  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=700&fit=crop',
                  'https://images.unsplash.com/photo-1565299585323-38174c4a6c7b?w=400&h=500&fit=crop',
                  'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=600&fit=crop',
                ]
                  .concat([
                    'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=700&fit=crop',
                    'https://images.unsplash.com/photo-1565299585323-38174c4a6c7b?w=400&h=500&fit=crop',
                    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=600&fit=crop',
                  ])
                  .map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt=""
                      className="w-full rounded-2xl object-cover shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] ring-1 ring-white/20"
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
