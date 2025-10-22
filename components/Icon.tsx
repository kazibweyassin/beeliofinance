import React from 'react';
import { 
  User, 
  Search, 
  DollarSign, 
  Shield, 
  BarChart3, 
  Smartphone, 
  Users, 
  Clock, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Star,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Globe,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Github,
  Zap,
  Target,
  Heart,
  TrendingUp,
  Award,
  Lock,
  Eye,
  EyeOff,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  AlertCircle,
  Chart,
  Check,
  Arrow,
  FileText,
  Calculator,
  Activity,
  Key,
  Fingerprint,
  Bell,
  WifiOff,
  Battery,
  Send,
  ShieldCheck,
  MessageCircle,
  Trophy,
  UserPlus,
  Apple,
  Play
} from 'lucide-react';

// Custom Google icon component
const GoogleIcon = ({ size = 24, className = '', color }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill={color || 'currentColor'}
  >
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Icon component with consistent sizing and styling
interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

export const Icon: React.FC<IconProps & { name: string }> = ({ 
  name, 
  size = 24, 
  className = '', 
  color 
}) => {
  const icons: { [key: string]: React.ComponentType<any> } = {
    user: User,
    search: Search,
    dollar: DollarSign,
    'dollar-sign': DollarSign,
    DollarSign: DollarSign,
    shield: Shield,
    chart: BarChart3,
    Chart: BarChart3,
    mobile: Smartphone,
    users: Users,
    clock: Clock,
    Clock: Clock,
    credit: CreditCard,
    'credit-card': CreditCard,
    check: CheckCircle,
    'check-circle': CheckCircle,
    CheckCircle: CheckCircle,
    Check: Check,
    x: XCircle,
    XCircle: XCircle,
    star: Star,
    menu: Menu,
    close: X,
    chevron: ChevronRight,
    arrow: ArrowRight,
    Arrow: Arrow,
    mail: Mail,
    phone: Phone,
    location: MapPin,
    'map-pin': MapPin,
    globe: Globe,
    twitter: Twitter,
    linkedin: Linkedin,
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    github: Github,
    zap: Zap,
    Zap: Zap,
    target: Target,
    heart: Heart,
    trending: TrendingUp,
    'trending-up': TrendingUp,
    TrendingUp: TrendingUp,
    award: Award,
    lock: Lock,
    eye: Eye,
    eyeOff: EyeOff,
    sun: Sun,
    moon: Moon,
    google: GoogleIcon,
    chevronDown: ChevronDown,
    logout: LogOut,
    logOut: LogOut,
    alert: AlertCircle,
    AlertCircle: AlertCircle,
    'file-text': FileText,
    FileText: FileText,
    calculator: Calculator,
    Calculator: Calculator,
    activity: Activity,
    Activity: Activity,
    key: Key,
    Key: Key,
    fingerprint: Fingerprint,
    Fingerprint: Fingerprint,
    bell: Bell,
    Bell: Bell,
    'wifi-off': WifiOff,
    WifiOff: WifiOff,
    battery: Battery,
    Battery: Battery,
    send: Send,
    Send: Send,
    'shield-check': ShieldCheck,
    ShieldCheck: ShieldCheck,
    'message-circle': MessageCircle,
    MessageCircle: MessageCircle,
    trophy: Trophy,
    Trophy: Trophy,
    'user-plus': UserPlus,
    UserPlus: UserPlus,
    apple: Apple,
    Apple: Apple,
    play: Play,
    Play: Play
  };

  const IconComponent = icons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent 
      size={size} 
      className={className}
      color={color}
    />
  );
};

// Predefined icon sets for different sections
export const FeatureIcons = {
  matching: 'search',
  security: 'shield', 
  analytics: 'chart',
  mobile: 'mobile',
  community: 'users'
};

export const StepIcons = {
  profile: 'user',
  browse: 'search',
  earn: 'dollar'
};

export const SocialIcons = {
  twitter: 'twitter',
  linkedin: 'linkedin', 
  facebook: 'facebook',
  instagram: 'instagram',
  youtube: 'youtube'
};

export default Icon;
