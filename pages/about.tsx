import { useState } from 'react';
import { toast, Zoom } from 'react-toastify';
import { FaDiscord } from 'react-icons/fa';
import { RiMailOpenFill } from 'react-icons/ri'
import copyToBoard from '../lib/helpers/copyToClipboard';
import validateEmail from '../lib/helpers/validateEmail'
import PageLayout from '../components/Layouts/PageLayout';
import Heading from '../components/Typography/Heading';
import Columns from '../components/Layouts/Columns';
import NodeCard from '../components/Cards/NodeCard';

export default function Contact() {

    return (
        <div className='h-screen'>
            <PageLayout>
                <Heading title='About us - SharpArt'>
                    <p className='text-th-primary-light'>More coming soon.</p>
                </Heading>
            </PageLayout>
        </div>
    );
}
