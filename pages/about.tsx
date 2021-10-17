import { useState } from 'react';
import {
    useMoralis,
    useMoralisQuery,
    useMoralisWeb3Api,
    useMoralisWeb3ApiCall,
} from 'react-moralis';
import PageLayout from '../components/Layouts/PageLayout';
import Heading from '../components/Typography/Heading';
import Columns from '../components/Layouts/Columns';
import NodeCard from '../components/Cards/NodeCard';

export default function About() {

       const web3API = useMoralisWeb3Api()
        const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(web3API.token.getAllTokenIds, {
              chain: 'polygon',
              format: 'decimal',
              address: '0x09E3049a06c3BF520CEcA77dd49EE3d80C2De4B3'
        });
        const fetchTokens = async () => {
            fetch()
        }
    return (
        <div className='h-screen'>
            <PageLayout>
                <Heading title='About us - SharpArt'>
                    <p className='text-th-primary-light'>More coming soon.</p>
                </Heading>
                <Heading title='Our NFTs'/>

            </PageLayout>
        </div>
    );
}
