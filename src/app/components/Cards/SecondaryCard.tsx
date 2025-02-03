import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface SecondaryCardProps {
    projectDoc:DocumentData
}

const SecondaryCard: React.FC<SecondaryCardProps> = ({projectDoc}) => {
  

    return (
    <div>
        <div className="image">
            <Image src={''} alt='image' width={150} height={150}/>
        </div>
        <div className="text">
            <h1>{projectDoc?.data().title}</h1>
            <h1>{projectDoc?.id}</h1>
        </div>
        <div className="editBtn"> <Link href={`/components/pages/edit-projects/${projectDoc.id}`}>Edit</Link> </div>
    </div>
  )
}

export default SecondaryCard