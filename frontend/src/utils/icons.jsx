import {
  HeartPulse, Flower2, Users, Clock, Award, Smile, Sparkles, ShieldCheck,
  Dumbbell, Music4, Sun, Leaf, Trophy, BadgeCheck, CalendarCheck, Gem,
  Target, Wallet, Handshake, Gift, Activity, PlayCircle,
} from 'lucide-react';

export const ICON_MAP = {
  'heart-pulse': HeartPulse,
  'flower-2': Flower2,
  'users': Users,
  'clock': Clock,
  'award': Award,
  'smile': Smile,
  'sparkles': Sparkles,
  'shield-check': ShieldCheck,
  'dumbbell': Dumbbell,
  'music-4': Music4,
  'sun': Sun,
  'leaf': Leaf,
  'trophy': Trophy,
  'badge-check': BadgeCheck,
  'calendar-check': CalendarCheck,
  'gem': Gem,
  'target': Target,
  'wallet': Wallet,
  'handshake': Handshake,
  'gift': Gift,
  'activity': Activity,
  'play-circle': PlayCircle,
};

export function DynamicIcon({ name, className, ...props }) {
  const Icon = ICON_MAP[name] || Sparkles;
  return <Icon className={className} {...props} />;
}

export default DynamicIcon;
