'use server'
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const getUser = async ({ query }: {
    query: string,
}) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${query}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github+json',
                "Authorization": `Bearer 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`,
            }
        });
        return response.data
    } catch (error) {
        console.error("Error fetching issues:", error);
    }
};

export const fetchAuthors = async ({ query }: { query: string }) => {
    try {
        const response = await axios
            .get(
                `https://api.github.com/repos/facebook/react/issues${query}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/vnd.github+json',
                        "Authorization": `Bearer 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`,
                    }
                }
            )
        const uniqueAuthors = [
            ...new Map(
                response.data.map((item) => [item.user.login, item.user])
            ).values(),
        ];
        return uniqueAuthors
    } catch (error) {
        console.error("Error fetching authors:", error);
    }
};
