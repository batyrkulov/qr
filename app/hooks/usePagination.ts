import { useCallback, useEffect, useState } from "react"

export type PaginationRes = {
  meta: {
    current_page: number
    pages_count: number
  }
}

export const usePagination = (fetchData: (page: number) => Promise<PaginationRes>) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isNext, setIsNext] = useState<boolean>(true)

  useEffect(() => {
    setCurrentPage(1)
    setIsNext(true)
  }, [fetchData])
  
  const fetchMore = useCallback(() => {
    if (isNext) {
      fetchData(currentPage).then((data) => {
        console.log(data);
        
        setCurrentPage(data.meta.current_page + 1)
        setIsNext(data.meta.current_page < data.meta.pages_count)
      })
    }
  }, [currentPage, fetchData, isNext])

  const reset = useCallback(() => {
    setCurrentPage(1)
    setIsNext(true)
  }, [])

  return { fetchMore, reset }
}
