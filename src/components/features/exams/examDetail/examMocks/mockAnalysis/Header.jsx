import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';




const Header = () => {
    return (
        <>
            <div className="flex flex-col p-1 m-3 bg-white rounded-md">
                <div className="flex">
                    <Stack direction="row" spacing={2}>
                        <Button variant="text" href="#outlined-buttons">
                        Mock Analysis
                        </Button>
                        <Button variant="text" href="#outlined-buttons">
                        Mock Test
                        </Button>
                        <Button variant="text" href="#outlined-buttons">
                        Mock Packages
                        </Button>
                    </Stack>
                </div>
                <hr className="bg-slate-100 w-full" />
            </div>
        </>
    )
}

export default Header