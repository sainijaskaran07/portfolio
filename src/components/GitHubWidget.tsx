import React, { useState, useEffect } from 'react'
import { GitBranch, Star, Users, BookOpen, ExternalLink } from 'lucide-react'

interface GitHubProfile {
  avatar_url: string
  name: string
  login: string
  bio: string
  followers: number
  public_repos: number
  html_url: string
}

interface Repository {
  name: string
  description: string
  stargazers_count: number
  forks_count: number
  html_url: string
  language: string
}

export const GitHubWidget: React.FC = () => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const username = 'jaskaransaini' // Jaskaran's GitHub username

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(false)

        // Fetch profile
        const profileRes = await fetch(`https://api.github.com/users/${username}`)
        if (!profileRes.ok) throw new Error('API Rate Limit or User Not Found')
        const profileData = await profileRes.json()
        setProfile(profileData)

        // Fetch repos (sorted by updated)
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        if (reposRes.ok) {
          const reposData = await reposRes.json()
          setRepos(reposData)
        }
      } catch (err) {
        console.warn('GitHub API failed, falling back to mock data:', err)
        setError(true)
        
        // Mock fallback data for offline/rate-limited environments
        setProfile({
          login: username,
          name: 'Jaskaran Singh',
          avatar_url: '/logo.png', // Fallback to local profile pic
          bio: 'Founder of Sins & Roses • Co-Founder of Chithiyan • All-Rounder Engineer & Builder',
          followers: 128,
          public_repos: 42,
          html_url: `https://github.com/${username}`
        })
        setRepos([
          {
            name: 'sins-and-roses-store',
            description: 'Premium headless e-commerce store built with Next.js, Tailwind, GSAP, and ERPNext integrations.',
            stargazers_count: 18,
            forks_count: 3,
            html_url: '#',
            language: 'TypeScript'
          },
          {
            name: 'chithiyan-gifting-platform',
            description: 'Luxury gifting platform for letters, incorporating 2D preview canvas and ERP templates.',
            stargazers_count: 14,
            forks_count: 2,
            html_url: '#',
            language: 'React'
          },
          {
            name: 'scroll-physics-canvas',
            description: 'Inertial particle grid simulation reacting to scroll speed and mouse spotlights.',
            stargazers_count: 9,
            forks_count: 1,
            html_url: '#',
            language: 'JavaScript'
          },
          {
            name: 'custom-gsap-router',
            description: 'React state router with hardware-accelerated page transition overlays.',
            stargazers_count: 5,
            forks_count: 0,
            html_url: '#',
            language: 'TypeScript'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 animate-pulse">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-[#222222] rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-[#222222] rounded w-1/3" />
            <div className="h-3 bg-[#222222] rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-3 bg-[#222222] rounded w-full" />
          <div className="h-3 bg-[#222222] rounded w-5/6" />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group/github">
      {/* Accent Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover/github:bg-primary/10 transition-colors duration-500" />
      
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/5 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={profile?.avatar_url}
            alt={profile?.name || username}
            className="w-16 h-16 rounded-full border border-white/10 object-cover"
          />
          <div>
            <h4 className="font-display font-bold text-lg text-white">
              {profile?.name || profile?.login}
            </h4>
            <span className="text-xs text-text-muted">@{profile?.login}</span>
            <p className="text-xs text-primary mt-1 font-sans">{profile?.bio}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs font-semibold text-text-muted">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-primary" />
            <span><strong className="text-white">{profile?.followers}</strong> followers</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-primary" />
            <span><strong className="text-white">{profile?.public_repos}</strong> repos</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h5 className="text-xs font-display uppercase tracking-widest font-semibold text-white/40 mb-4 flex items-center gap-2">
        <span>Latest Activity / Repositories</span>
        {error && <span className="text-[10px] text-primary lowercase tracking-normal">(offline cache active)</span>}
      </h5>

      {/* Repos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo, idx) => (
          <a
            key={idx}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="block p-5 bg-background border border-[#2A2A2A] hover:border-primary/30 rounded-lg transition-all duration-300 relative group/repo"
          >
            <div className="flex items-center justify-between mb-2">
              <h6 className="font-display font-bold text-sm text-white group-hover/repo:text-primary transition-colors duration-300 truncate max-w-[80%]">
                {repo.name}
              </h6>
              <ExternalLink className="h-3 w-3 text-text-muted group-hover/repo:text-primary transition-colors duration-300" />
            </div>
            
            <p className="text-xs text-text-muted font-sans font-light leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
              {repo.description || 'No description provided.'}
            </p>

            <div className="flex items-center justify-between text-[10px] font-semibold text-text-muted">
              {repo.language && (
                <span className="bg-[#111111] px-2 py-1 rounded border border-[#2A2A2A] text-white/80">
                  {repo.language}
                </span>
              )}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-500 fill-amber-500/10" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitBranch className="h-3 w-3" />
                  <span>{repo.forks_count}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Bottom Profile Link */}
      <div className="mt-6 text-center">
        <a
          href={profile?.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase font-display tracking-widest font-semibold text-text-muted hover:text-white transition-colors duration-300"
        >
          <span>View entire Github Profile</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}
