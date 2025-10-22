import dynamic from 'next/dynamic';

const KYCVerify = dynamic(() => import('../../components/kyc/KYCVerify'), {
  ssr: false,
});

export default KYCVerify;