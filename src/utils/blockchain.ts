// Request access to the user's MetaMask account
export async function requestAccount() {
    if (window.ethereum?.request)
        return window.ethereum.request({ method: "eth_requestAccounts" });

    throw new Error(
        "Missing install Metamask. Please access https://metamask.io/ to install extension on your browser",
    );
}