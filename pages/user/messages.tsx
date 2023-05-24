import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/UserProfileTwo.module.css'
import React from 'react';
import UserMessage from '../../components/frontend/user/Messages';

const inter = Inter({ subsets: ['latin'] })

export default function Messages() {
  return (
    <>
      <UserMessage/>
    </>
  )
}
