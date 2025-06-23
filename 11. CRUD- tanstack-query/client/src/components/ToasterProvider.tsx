import { Toaster } from 'sonner'

function ToasterProvider() {
    return (
        <Toaster
            position="top-right"
            richColors
            closeButton
            expand={true}
            visibleToasts={9}
            toastOptions={{
                duration: 4000,
            }}
        />
    )
}

export default ToasterProvider