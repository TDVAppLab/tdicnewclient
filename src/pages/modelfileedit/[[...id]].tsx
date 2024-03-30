import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import type { AnimationClip } from 'three'
import { Color, NoToneMapping, sRGBEncoding } from 'three'
import * as Yup from 'yup'

import agent from '@/app/api/agent'
import TextAreaGeneral from '@/app/common/form/TextAreaGeneral'
import TextInputGeneral from '@/app/common/form/TextInputGeneral'
import type { Modelfile } from '@/app/models/ModelFile'
import { getDefaultValueOfModelfile } from '@/app/models/ModelFile'
import type { PartAnimationClip } from '@/app/models/PartAnimationClip'
import { useStore } from '@/app/stores/store'
import LoadingComponent from '@/components/layout/LoadingComponents'
import TestLighting from '@/components/modelfile/common/AddLighting'
import ControlPanel from '@/components/modelfile/common/ModelFilesEditControlPanel'
import ModelfileViewer from '@/components/modelfile/common/ModelfileViewer'
import SetScreenObjectInfo from '@/components/modelfile/common/SetScreenObjectInfo'
import ShowAction from '@/components/modelfile/common/ShowAction'
import EditModelfileEyecatch from '@/components/modelfile/edit/EditModelfileEyecatch'
import ModelfileUploader from '@/components/modelfile/edit/ModelfileUploader'
import ShowScreenObjectInfo from '@/components/modelfile/edit/ShowScreenObjectInfo'








const ModelfileEditCanvas = dynamic(() => import('@/components/modelfile/edit/modelfilecanvas'), {
  ssr: false,
})



export default observer(function ModelfileEdit() {
  const { modelfileStore } = useStore()
  const {
    selectedModelfile,
    loadModelfile,
    updateModelfile,
    deleteModelfile,
    loading,
  } = modelfileStore

  const router = useRouter()
  const { id } = router.query

  const [isMExecAnimation, setIsMExecAnimation] = useState(false)
  const [animations, setAnimations] = useState<AnimationClip[]>([])
  const [partAnimationClips, setPartAnimationClips] = useState<
    PartAnimationClip[]
  >([])
  const [modelUuid, setModelUuid] = useState('')

  const [modelfile, setModelfile] = useState<Modelfile>(
    getDefaultValueOfModelfile(),
  )

  const validationSchema = Yup.object({
    part_number: Yup.string().required(),
    version: Yup.number().required(),
    type_data: Yup.string().nullable(),
    format_data: Yup.string().nullable(),
    file_name: Yup.string().nullable(),
    license: Yup.string().nullable(),
    author: Yup.string().nullable(),
    memo: Yup.string().nullable(),
  })

  const validationSchemaDel = Yup.object({
    id_part: Yup.string().required(),
  })

  useEffect(() => {
    if (id) {
      loadModelfile(id[0]) // Fix: Pass the first element of the id array
      agent.Modelfiles.getPartAnimationClips(id[0]).then((response) => {
        setPartAnimationClips(response)
      })
    }
  }, [id])

  useEffect(() => {
    selectedModelfile && setModelfile(selectedModelfile)
  }, [selectedModelfile])

  function handleFormSubmit(modelfile: Modelfile) {
    console.log(modelfile)
    if (modelfile.id_part === '') {
    } else {
      updateModelfile(modelfile)
    }
  }

  function handleFormSubmitResetAnimationClipArray() {
    const PartAnimationClips: PartAnimationClip[] = []
    animations.forEach((animation, index) => {
      PartAnimationClips.push({ no: index, name: animation.name })
    })

    if (id) {
      console.log(PartAnimationClips)
      agent.Modelfiles.updatePartAnimationClip(id[0], PartAnimationClips).then(
        (response) => {},
      )
    }
  }

  if (loading) return <LoadingComponent />

  return id ? (
    <div>
      <h3>Model Edit</h3>

      <Row>
        <Col sm={6}>
          <div className="row" style={{ height: '45vh', width: '45vw' }}>
            <ModelfileEditCanvas id={id[0]} modelUuid={modelUuid} animations={animations} setAnimations={setAnimations} setModelUuid={setModelUuid} isMExecAnimation={isMExecAnimation} setIsMExecAnimation={setIsMExecAnimation} />

          </div>
        </Col>

        <Col sm={6}>
          <Tabs defaultActiveKey="modelfile_dataedit" id="modelfile-tab-edit">
            <Tab eventKey="modelfile_dataedit" title="Edit">
              <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={modelfile}
                onSubmit={(values) => handleFormSubmit(values)}
              >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                  <Form
                    className="ui form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    <Row>
                      <Col xs={4}>
                        <label>ID Part</label>
                        <input
                          className="form-control"
                          value={modelfile.id_part}
                          disabled
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={4}>
                        <label>Type Data</label>
                        <input
                          className="form-control"
                          value={modelfile.type_data}
                          disabled
                        />
                      </Col>
                      <Col xs={4}>
                        <label>File Name</label>
                        <input
                          className="form-control"
                          value={modelfile.file_name}
                          disabled
                        />
                      </Col>
                      <Col xs={4}>
                        <label>File Length</label>
                        <input
                          className="form-control"
                          value={modelfile.file_length}
                          disabled
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={4}>
                        <TextInputGeneral
                          label="Part Number"
                          name="part_number"
                          placeholder="part_number"
                        />
                      </Col>
                      <Col xs={4}>
                        <TextInputGeneral
                          label="Version"
                          name="version"
                          placeholder="version"
                        />
                      </Col>
                      <Col xs={4}>
                        <TextInputGeneral
                          label="Format Fata"
                          name="format_data"
                          placeholder="format_data"
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <TextInputGeneral
                          label="Itemlink"
                          name="itemlink"
                          placeholder="itemlink"
                        />
                      </Col>
                      <Col xs={6}>
                        <TextInputGeneral
                          label="License"
                          name="license"
                          placeholder="license"
                        />
                      </Col>
                      <Col xs={6}>
                        <TextInputGeneral
                          label="Author"
                          name="author"
                          placeholder="author"
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <TextAreaGeneral
                          label="Memo"
                          name="memo"
                          placeholder="memo"
                          rows={3}
                        />
                      </Col>
                    </Row>
                    <button
                      disabled={!isValid || !dirty || isSubmitting}
                      type="submit"
                      className="btn btn-primary"
                    >
                      {
                        //    isSubmitting && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      }
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>

              <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize
                initialValues={modelfile}
                onSubmit={(values) => {
                  deleteModelfile(values).then(() => {
                    redirect(`/modelfiles`)
                  })
                }}
              >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                  <Form
                    className="ui form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    <button
                      disabled={!isValid || isSubmitting}
                      className="btn btn-danger"
                      type="submit"
                    >
                      Delete
                    </button>
                  </Form>
                )}
              </Formik>

              <hr />

              <div>
                <Link href="/modelfiles">Return Index</Link> |
                <Link href={`/modelfile/${id}`}>Details</Link>
              </div>
            </Tab>

            <Tab eventKey="thumbnail" title="Thumbnail">
              <EditModelfileEyecatch />
            </Tab>

            <Tab eventKey="animation" title="Animation">
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>No</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partAnimationClips.map((x, index) => (
                      <tr key={x.name}>
                        <td>{index}</td>
                        <td>{x.no}</td>
                        <td>{x.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {animations.map((x, index) => (
                      <tr key={x.name}>
                        <td>{index}</td>
                        <td>{x.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="submit"
                className={'btn btn-primary'}
                onClick={() => {
                  handleFormSubmitResetAnimationClipArray()
                }}
              >
                {'Reset Model Action Array'}
              </button>
            </Tab>

            <Tab eventKey="references" title="References">
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID.</th>
                      <th>Article Title</th>
                      <th>Article Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedModelfile &&
                      selectedModelfile.article_references.map((x) => (
                        <tr key={x.id_article}>
                          <td>{x.id_article}</td>
                          <td>
                            <Link href={`/articleedit/${x.id_article}`}>
                              {x.title}
                            </Link>
                          </td>
                          <td>{x.status_name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Tab>

            <Tab eventKey="setting" title="Setting">
              <div>
                <ShowScreenObjectInfo />
              </div>
            </Tab>

            <Tab eventKey="ReUpload" title="ReUpload">
              <div>
                <ModelfileUploader />
              </div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </div>
  ) : (
    <div></div>
  )
})
