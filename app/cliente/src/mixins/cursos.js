const cursos = [
  {
    id: '5e7f733f3ede40fc1961ac3b',
    title: 'Alteraciones Cardiovasculares',
    ext: 'jpg',
    /* slides: [
      { id: '5e7fbf733ede40fc1961ac40', ext: 'jpg' },
      { id: '5e7fbf753ede40fc1961ac41', ext: 'jpg' },
      { id: '5e7fbf753ede40fc1961ac42', ext: 'jpg' },
      { id: '5e7fbf763ede40fc1961ac43', ext: 'jpg' },
      { id: '5e7f733f3ede40fc1961ac3b', ext: 'jpg' },
      { id: '5e7fbf773ede40fc1961ac45', ext: 'jpg' },
      { id: '5e7fbf773ede40fc1961ac46', ext: 'jpg' },
      { id: '5e7fbf783ede40fc1961ac47', ext: 'jpg' },
      { id: '5e7fbf783ede40fc1961ac48', ext: 'jpg' },
      { id: '5e7fbf793ede40fc1961ac49', ext: 'jpg' }
    ], */
    video: '5e7a7baa5766d124e3396578.mp4'
  },
  { id: '5e7f76a13ede40fc1961ac3c', title: 'Electrocardiografía', ext: 'jpg', video: '5e7fd5233ede40fc1961ac4e.mp4' },
  { id: '5e7f78de3ede40fc1961ac3d', title: 'Manejo de Líquidos y Electrolitos', ext: 'jpg', video: '5e7fd44c3ede40fc1961ac4d.mp4' },
  { id: '5e7fa2993ede40fc1961ac3e', title: 'Alteraciones Neurológicas', ext: 'jpg', video: '5e7fcf4a3ede40fc1961ac4b.mp4' },
  { id: '5e7fa2dc3ede40fc1961ac3f', title: 'Trastornos Respiratorios', ext: 'jpg', video: '5e7fd3d73ede40fc1961ac4c.mp4' },
  {
    id: '5e7fc6a03ede40fc1961ac4a',
    title: 'Fundamentos de la Ventilación Mecánica',
    ext: 'png',
    video: '5e7fc6a03ede40fc1961ac4a.mp4'
  }
]

export default {
  methods: {
    getCursos () {
      return cursos
    },
    getCurso (id) {
      return cursos.find(val => val.id === id)
    }
  }
}
