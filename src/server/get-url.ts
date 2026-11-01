let serverUrl: string = ''

export const getServerUrl = async (): Promise<string> => {
    if (serverUrl.length > 0) {
        return serverUrl
    }

    let location = window.location.href;
    if (! location.endsWith("/")) {
        location = location + "/"
    }
    const response = await fetch(location + "config/config.json");

    if (!response.ok) {
        throw new Error('Failed to load config');
    }

    const config = await response.json();

    serverUrl = config.serverURL;

    return serverUrl;
}
