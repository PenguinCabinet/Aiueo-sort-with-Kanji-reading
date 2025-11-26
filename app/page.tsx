'use client'
import { useCallback, useEffect, useState } from 'react'
import Image from "next/image"
import Kuroshiro from "kuroshiro"
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji"
import "./globals.css"
import 'material-symbols'

async function sort_func(kuroshiro, x) {
  const x_arr = x
    .split("\n")
    .filter((e) => e != "")
  const yomigana_x_arr = await Promise.all(
    x_arr.map(async (e) => {
      return kuroshiro.convert(e, { to: "hiragana" })
    })
  )

  let yomigana_x_index_arr = yomigana_x_arr.map((e, i) => [i, e])

  yomigana_x_index_arr.sort((a, b) => a[1].localeCompare(b[1], 'ja'))

  return {
    yomigana: yomigana_x_index_arr.map((e) => e[1]).join("\n"),
    result: yomigana_x_index_arr.map((e) => x_arr[e[0]]).join("\n"),
  }

}

export default function Home() {

  const [Out_yomigana, setOut_yomigana] = useState("")
  const [Out_result, setOut_result] = useState("")
  const [Out_yomigana_placeholder, setOut_yomigana_placeholder] = useState("")
  const [Out_result_placeholder, setOut_result_placeholder] = useState("")

  const [kuroshiro, set_kuroshiro] = useState(new Kuroshiro())
  const [isLoading, setLoading] = useState(true)

  const placeholder = `茨城県
栃木県
群馬県
埼玉県
千葉県
東京都
神奈川県
山梨県
長野県
トウキョウト
とうきょうと
ﾄｳｷｮｳﾄ
12345
`

  useEffect(() => {
    kuroshiro.init(new KuromojiAnalyzer({ dictPath: "/dict" })).then((e) => {

      sort_func(kuroshiro, placeholder).then((placeholder_result) => {
        console.log(placeholder_result)
        setOut_yomigana_placeholder(placeholder_result.yomigana)
        setOut_result_placeholder(placeholder_result.result)
      })

      setLoading(false)
    })
  }, [])

  if (isLoading) return <div></div>


  return (
    <main>
      <h1 className="text-3xl font-bold text-heading my-3"
      >漢字の読みを考慮した、あいうえお順ソートツール</h1>

      <h2 className='text-2xl font-bold text-heading my-3'>
        ソートする文字列</h2>

      <textarea
        rows={6}
        className='bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body'
        onChange={
          (e) => {
            const f = async () => {
              const result = await sort_func(kuroshiro, e.target.value)
              setOut_yomigana(
                result.yomigana
              )
              setOut_result(result.result)

            }
            f()
          }
        }
        placeholder={placeholder} />
      <div className='my-3'>
        <div className="flex items-center gap-4">
          <h2 className='text-2xl font-bold text-heading'>
            ソートした文字列の読み方</h2>
          <button type="button"
            onClick={
              () => {
                navigator.clipboard.writeText(Out_yomigana)
              }
            }
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            <span className="material-symbols-outlined">
              content_copy
            </span>
          </button>
        </div>

        <textarea
          rows={6}
          className='bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body'
          value={Out_yomigana} readOnly={true}
          placeholder={Out_yomigana_placeholder} />
      </div>

      <div className='my-3'>
        <div className="flex items-center gap-4">
          <h2 className='text-2xl font-bold text-heading'>
            ソートした文字列</h2>
          <button type="button"
            onClick={
              () => {
                navigator.clipboard.writeText(Out_result)
              }
            }
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            <span className="material-symbols-outlined">
              content_copy
            </span>
          </button>
        </div>
        <textarea
          rows={6}
          className='bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body'
          value={Out_result} readOnly={true}
          placeholder={Out_result_placeholder} />
      </div>


      <pre>

        <a
          className='text-blue-500 hover:underline'
          href='https://github.com/PenguinCabinet/Aiueo-sort-with-Kanji-reading'>Githubリポジトリはこちら</a>
      </pre>
    </main>
  )
}
