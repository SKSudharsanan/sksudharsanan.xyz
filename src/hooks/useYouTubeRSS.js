import { useState, useEffect } from 'react'

export function useYouTubeRSS(channelId) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!channelId) {
      setLoading(false)
      return
    }

    const fetchVideos = async () => {
      try {
        setLoading(true)
        
        // YouTube RSS feed URL
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
        
        // Use a CORS proxy to fetch the RSS feed
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`
        
        const response = await fetch(proxyUrl)
        const xmlText = await response.text()
        
        // Parse XML
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
        
        // Extract video data
        const entries = xmlDoc.querySelectorAll('entry')
        const videoData = Array.from(entries).map((entry) => {
          const videoId = entry.querySelector('videoId')?.textContent || ''
          const title = entry.querySelector('title')?.textContent || 'Untitled'
          const published = entry.querySelector('published')?.textContent || ''
          const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
          
          return {
            id: videoId,
            videoId,
            title,
            published,
            thumbnail,
          }
        })
        
        setVideos(videoData)
        setError(null)
      } catch (err) {
        console.error('Error fetching YouTube RSS:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [channelId])

  return { videos, loading, error }
}

