const success = (
    message,
    data = {},
    messageCode = ''
) => {
    const response = {
        status: true,
        message: message,
        messageCode: messageCode,
        result: data,
    };

    return response;
};

const error = (
    message,
    data = {},
    messageCode = ''
) => {
    const response = {
        status: false,
        message: message,
        messageCode: messageCode,
        result: data,
    };

    return response;
};

export default { success, error };