import { Box, Typography } from '@mui/material'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

export default function TabPanel({ children, value, index }: TabPanelProps) {

    return (
        <section className="tab-panel" hidden={value !== index}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </section>
    )
}
