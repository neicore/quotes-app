import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/ThemeProvider'

const Home: NextPage = () => {
  const [data, setData] = useState({} as { content: string; author: string })
  const { mode, setMode } = useContext(AppContext)

  const fetchDataSetData = async () => {
    const response = await fetch('https://api.quotable.io/random')

    const data = await response.json()

    if (data && data.length) setData(data)
  }

  useEffect(() => {
    fetchDataSetData()
  }, [])

  return (
    <div>
      <Head>
        <title>Quotes App</title>
        <meta name="description" content="Simple quotes app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`container ${
          mode === 'dark' ? 'container-dark' : 'container-light'
        }`}
      >
        <div className="switcher-container">
          <input
            type="checkbox"
            id="switch"
            onClick={() => {
              setMode(mode === 'dark' ? 'light' : 'dark')
              localStorage.setItem('mode', mode === 'dark' ? 'light' : 'dark')
              console.log(
                'local storage ternary',
                'mode',
                mode === 'dark' ? 'light' : 'dark'
              )
            }}
          />
          <label htmlFor="switch">Toggle</label>
        </div>

        <div className="quote-area">
          <div
            className={`quote-card ${
              mode === 'dark' ? 'quote-card-dark' : 'quote-card-light'
            }`}
          >
            <p className="quote">{data.content}</p>
            <p className="author">{data.author}</p>
          </div>

          <button
            className="quote-random"
            onClick={() => {
              fetchDataSetData()
            }}
          >
            Random
          </button>
        </div>

        <div className="footer">
          <p>
            Quotes provided by &nbsp;
            <a
              href="https://github.com/lukePeavey/quotable"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quotable
            </a>
          </p>

          <div className="made">
            <p>Made with passion in Tanzania &nbsp;</p>
            <a
              href="https://github.com/lukePeavey/quotable"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github repo
            </a>
            &nbsp;
            <a
              href="https://twitter.com/neicoree"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
