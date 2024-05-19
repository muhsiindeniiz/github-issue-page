'use server'
import axios from "axios";

export const getIssues = async ({ query, params = '' }: {
    query: string,
    params?: string
}) => {
    try {
        const response = await axios.get(`https://api.github.com/repos${query}${params}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github+json',
                "Authorization": `Bearer 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`,
            }
        })
        return response.data
    } catch (error) {
        console.error("Error fetching issues:", error);
    }
};