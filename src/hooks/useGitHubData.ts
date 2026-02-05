import { useState, useEffect, useCallback } from "react";
import { fetchAllGitHubData } from "@/services/github.service";
import type { GitHubDataPayload } from "@/types/github.types";

const CACHE_KEY = "github_portfolio_data";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

function getCached(): GitHubDataPayload | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, expiresAt } = JSON.parse(raw) as {
      data: GitHubDataPayload;
      expiresAt: number;
    };
    if (Date.now() > expiresAt) return null;
    return data;
  } catch {
    return null;
  }
}

function setCache(data: GitHubDataPayload): void {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data,
        expiresAt: Date.now() + CACHE_TTL_MS,
      })
    );
  } catch {
    // ignore
  }
}

export interface UseGitHubDataResult {
  data: GitHubDataPayload | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useGitHubData(): UseGitHubDataResult {
  const [data, setData] = useState<GitHubDataPayload | null>(getCached());
  const [loading, setLoading] = useState(!getCached());
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setError(null);
    const cached = getCached();
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const payload = await fetchAllGitHubData();
      setData(payload);
      setCache(payload);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Não foi possível carregar os dados do GitHub.";
      setError(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const retry = useCallback(() => {
    try {
      sessionStorage.removeItem(CACHE_KEY);
    } catch {
      // ignore
    }
    setData(null);
    fetchData();
  }, [fetchData]);

  return { data, loading, error, retry };
}
