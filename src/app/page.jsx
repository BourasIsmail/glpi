import Card from '@/components/card'
import React from 'react'

const page = () => {
    return (
        <div className='pt-6'>
            <div className='flex flex-row justify-evenly'>
                <Card name="Materiels Affecté" count="12" />
                <Card name="Materiels disponible" count="12" />
                <Card name="Ticket non traité" count="12" />
            </div>

        </div>
    )
}

export default page
