export function unionFormData(formData: FormData, extra: Array<Record<string, any>> | null | undefined): FormData {
    // 1. Проверяем, что extra вообще существует и это массив
    if (!extra || !Array.isArray(extra)) return formData;

    extra.forEach((obj) => {
        // 2. Проверяем, что текущий элемент массива — это объект
        if (!obj) return;

        Object.entries(obj).forEach(([key, value]) => {
            // 3. Пропускаем undefined и null, чтобы не засерать FormData
            if (value === null || value === undefined) {
                return;
            }

            // 4. Добавляем только валидные данные
            formData.append(key, value as string | Blob);
        });
    });

    return formData;
}