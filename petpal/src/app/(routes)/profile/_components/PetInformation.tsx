'use client'

import { addPet, deletePet, editPetInfo, getPets } from "@/app/libs/user/petapi";
import { AnimatePresence,motion } from "framer-motion";
import { opendir } from "fs";
import {useState,useEffect} from "react"
import React from "react";


export default function PetInformation(){

    type PetInfo = {
      age: number,
      behaviouralNotes: string,
      breed: string,
      certificate: string,
      dietyPreferences: string,
      gender: string,
      healthInformation: string,
      name: string,
      type: string,
      vaccinations: string
    }

    const EmptyPetInfo : PetInfo = {
      age: 0,
      behaviouralNotes: "",
      breed: "",
      certificate: "",
      dietyPreferences: "",
      gender: "",
      healthInformation:  "",
      name:  "",
      type:  "",
      vaccinations:  ""
    }

    const [isOpen , setIsOpen] = useState(true)
    const [pets , setPets] = useState<Array<PetInfo>>([EmptyPetInfo])
    const [details , setDetails] = useState<PetInfo>(EmptyPetInfo)
    const [openedDetail , setOpenedDetail] = useState<number>(-1)
    const [deleteAndAddClicked , setDeleteAndAddClicked] = useState<Boolean>()
    const [petEditButtonName , setPetEditButtonName] = useState<string>('Edit')

    const [age,setAge] = useState(0)
    const [behav,setBehav] = useState("")
    const [breed , setBreed] = useState("")
    const [cert,setCert] = useState("")
    const [diet,setDiet] = useState("")
    const [gender,setGender] = useState("")
    const [health,setHealth] = useState("")
    const [name,setName] = useState("")
    const [type,setType] = useState("")
    const [vaccine,setVaccine] = useState("")

    const petInfo = [
      {Name:"Pet Name" , inputType:"box" , value:name },{Name:"Animal Type" , inputType:"box",value:type},
      {Name:"Breed" , inputType:"box" , value:breed},
      {Name:"Gender" , inputType:"choice" ,option:["Male","Female"] , value:gender},{Name:"Age" , inputType:"box",value:age},
      {Name:"Health Information" , inputType:"box",value:health},
      {Name:"Vaccination Records" , inputType:"box",value:vaccine},{Name:"Dietary Preference" , inputType:"box",value:diet},
      {Name:"Behavioral Note" , inputType:"box",value:behav},{Name:"Certificates" , inputType:"box",value:cert},
    ]


    useEffect(()=>{
      let i;
      const fetchData = async() =>{
        const allpets = await getPets()
        setPets([EmptyPetInfo ,...allpets.pets])
        setDeleteAndAddClicked(false)
      }
      fetchData();
    },[deleteAndAddClicked])

    const handleDelete = async(e:any,index:Number) =>{
      e.preventDefault();
      setDeleteAndAddClicked(true)
      // handleOpenDetail(EmptyPetInfo)
      await deletePet(index)
    }

    const handleAdd = async(e:any) =>{
      e.preventDefault();
      setDeleteAndAddClicked(true)
      var pet:PetInfo = {
        age: age,
        behaviouralNotes: behav,
        breed: breed,
        certificate: cert,
        dietyPreferences: diet,
        gender: gender,
        healthInformation: health,
        name: name,
        type: type,
        vaccinations: vaccine,
      }
      if(openedDetail !== undefined && openedDetail != 0){
        await editPetInfo(openedDetail-1,pet)
      }else{
        await addPet(pet)
      }
    }

    const handleOpenDetail = (pet:PetInfo)=>{
      setAge(pet.age)
      setBehav(pet.behaviouralNotes)
      setBreed(pet.breed)
      setCert(pet.certificate)
      setDiet(pet.dietyPreferences)
      setGender(pet.gender)
      setHealth(pet.healthInformation)
      setName(pet.name)
      setType(pet.type)
      setVaccine(pet.vaccinations)
    }

    const handleOnchange = (e:any,tag:string) =>{
      var input = e.target.value
      switch(tag){
        case "Pet Name":
          setName(input)
          break
        case "Animal Type":
          setType(input)
          break
        case "Breed":
          setBreed(input)
          break
        case "Gender":
          setGender(input)
          break
        case "Age":
          setAge(parseInt(input))
          break
        case "Health Information":
          setHealth(input)
          break
        case "Vaccination Records":
          setVaccine(input)
          break
        case "Dietary Preference":
          setDiet(input)
          break
        case "Behavioral Note":
          setBehav(input)
          break
        case "Certificates":
          setCert(input)
          break
        default: 
      }
    }


    const petinfoVar = {
      initial: {
        y: -10,
        opacity:0,
        scaleY:0
      },
      animate: {
        y: 1,
        opacity:1,
        scaleY:1,
        transition: {
          duration: 2,
          ease: [0.12, 0, 0.39, 0],
        },
      },
      exit: {
        y: -10,
        opacity:0,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    };

    

    return(
      <div className = "my-2 ">
          <span className='text-black font-bold text-[20px]'>Pets</span>

          {pets.length>1 &&
            pets.map((pet,index)=>
              <div>
              {index!=0&&
                <button className='flex justify-between bg-gray w-fit rounded-[5px] pl-1 mb-1' onClick={()=>{setOpenedDetail(index);setPetEditButtonName('Edit')}}>
                  <span onClick={()=>handleOpenDetail(pet)}>{pet.name}</span>
                  <button className='w-5 h-5 justify-center items-center flex 'onClick={(e) =>{handleDelete(e,index-1)}} >x</button>
                </button>
              }
              </div>
            )
          }
          <div className='flex justify-between bg-gray w-fit rounded-[5px] pl-1 mb-1'>
            <button className='w-5 h-5 justify-center items-center flex 'onClick={() => {setOpenedDetail(0);handleOpenDetail(EmptyPetInfo);setPetEditButtonName('Add')}} >+</button>
          </div>
        <AnimatePresence>
        {openedDetail !== -1 &&
        <motion.div 
        variants={petinfoVar}
        initial="inital"
        animate="animate"
        exit="exit"
        className='h-[476px] border-[3px] rounded-md border-gray overflow-y-scroll my-2 pl-2'>
          {
            petInfo.map((info,index) => 
              <div data-twe-animation="[drop-in_2s]" className = "my-2 w-[75%]">
                <span className='text-black font-bold text-[16px]'>{info.Name}</span>
                {info.inputType == 'box' &&
                  <input type='text' className='mt-1 block w-full rounded-md shadow-sm
                  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary border-[#D9D9D9] border-[3px]'
                  value={info.value}
                  onChange={(e)=>{handleOnchange(e,info.Name)}}
                   />
                }
                {info.inputType == 'choice' &&
                  <form className="md:flex md:pl-0 ">
                    <select className="bg-gray rounded-[10px]" value={info.value} onChange={(e)=>setGender(e.target.value)}>
                      {info.option?.map((opName) => 
                        <option>{opName}</option>
                      )}
                    </select>
                  </form>
                }
              </div>
            )
          }
          <div className='flex justify-end m-2'>
                <button type = 'submit' className='bg-[#D9D9D9] w-[102px] rounded-[10px] text-[18px] text-center p-[5px]' onClick={(e)=>{handleAdd(e)}}>{petEditButtonName}</button>
          </div>
        </motion.div> }
        </AnimatePresence>
      </div>
    )
}