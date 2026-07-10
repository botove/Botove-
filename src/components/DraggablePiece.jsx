import { useState, useEffect, useRef } from 'react'
import './DraggablePiece.css'

const DraggablePiece = ({ piece, onDrop, boardRef, containerRef }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const pieceRef = useRef(null)

  const handleMouseDown = (e) => {
    if (e.touches) {
      // Touch event
      const touch = e.touches[0]
      const rect = pieceRef.current.getBoundingClientRect()
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      })
    } else {
      // Mouse event
      const rect = pieceRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
    setIsDragging(true)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return

    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY

    const containerRect = containerRef.current.getBoundingClientRect()
    const newX = clientX - containerRect.left - dragOffset.x
    const newY = clientY - containerRect.top - dragOffset.y

    setPosition({ x: newX, y: newY })
  }

  const handleMouseUp = (e) => {
    setIsDragging(false)

    if (!boardRef.current) {
      setPosition({ x: 0, y: 0 })
      return
    }

    const boardRect = boardRef.current.getBoundingClientRect()
    const pieceRect = pieceRef.current.getBoundingClientRect()
    const pieceCenterX = pieceRect.left + pieceRect.width / 2
    const pieceCenterY = pieceRect.top + pieceRect.height / 2

    // Check if piece is over the board
    if (
      pieceCenterX >= boardRect.left &&
      pieceCenterX <= boardRect.right &&
      pieceCenterY >= boardRect.top &&
      pieceCenterY <= boardRect.bottom
    ) {
      // Calculate which cell the piece is over
      const relX = pieceCenterX - boardRect.left
      const relY = pieceCenterY - boardRect.top
      const cellSize = boardRect.width / 8
      const col = Math.floor(relX / cellSize)
      const row = Math.floor(relY / cellSize)
      const index = row * 8 + col

      if (index >= 0 && index < 64) {
        onDrop(index)
      }
    }

    // Reset position
    setPosition({ x: 0, y: 0 })
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleMouseMove)
      document.addEventListener('touchend', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleMouseMove)
        document.removeEventListener('touchend', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  return (
    <div
      ref={pieceRef}
      className={`draggable-piece ${isDragging ? 'dragging' : ''}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        backgroundColor: piece.color,
        boxShadow: isDragging
          ? `0 0 40px ${piece.color}, 0 20px 40px rgba(0, 0, 0, 0.5)`
          : `0 0 20px ${piece.color}, inset 0 0 10px ${piece.color}40`
      }}
    />
  )
}

export default DraggablePiece
