import '@/styles/globals.css'
import { Web3Modal } from '@/context/web3modal';
export const metadata = {
  title: 'BallotBridge',
  description: 'The leading platform for governmental elections in Africa.'
}

export default function App({ Component, pageProps }) {
  return  (
         <>
           <Web3Modal>
           <Component {...pageProps} />
           </Web3Modal>
          </>
          )
}
