import AuthLayout from '@/app/components/auth/Layout/AuthLayout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
