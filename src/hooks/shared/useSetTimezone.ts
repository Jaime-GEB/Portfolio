// Hook para formatear fechas a la zona horaria local (Europe/Madrid)
const useSetTimezone = () => {
    const setTimezone = (date: string) => {
        try {
            const toDate = new Date(date);

            // Validaciones para fechas inválidas o vacías
            if (Number.isNaN(toDate.getTime())) return "-";
            if (toDate.getTime() === 0) return "-";

            // Ajuste de la zona horaria
            toDate.setTime(toDate.getTime() + toDate.getTimezoneOffset() * -60000);
            return toDate.toLocaleString("es-ES", { timeZone: "Europe/Madrid" } as Intl.DateTimeFormatOptions);
        } catch (error) {
            console.error('Error al establecer la zona horaria:', error);
        }
    }
    return { setTimezone };
}
export default useSetTimezone;