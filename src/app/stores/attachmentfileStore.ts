import {  makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";
import type { Attachmentfile } from "../models/attachmentfile";


export default class AttachmentfileStore {
    AttachmentfileRegistry = new Map<string, Attachmentfile>();
    selectedAttachmentfile: Attachmentfile| undefined = undefined;
    loading=false;

    constructor(){
        makeAutoObservable(this)
    }


    get AttachmentfilesArray(){
        
        return Array.from(this.AttachmentfileRegistry.values());

            
    }
    get AttachmentfilesByDate(){
        
        return Array.from(this.AttachmentfileRegistry.values()).sort((a,b) => 
            a.create_datetime!.getTime() - b.create_datetime!.getTime());

            
    }
/*
    get groupedAttachmentfiles(){
        return Object.entries(
            this.AttachmentfilesByDate.reduce((attachmentfiles,attachmentfile) => {
                const id = attachmentfile.id_file;
                attachmentfiles[id] = attachmentfiles[id] ? [...attachmentfiles[id], attachmentfile] : [attachmentfile];
                return attachmentfiles;
            }, {} as {[key: number]: Attachmentfile[]})
        )
    }*/


    loadAttachmentfiles = async () => {
        this.loading = true;
        this.AttachmentfileRegistry.clear();
        try {
            const attachmentfiles = await agent.Attachmentfiles.list();
            //@ts-ignore
            attachmentfiles.forEach(attachmentfile => {
                this.setAttachmentfile(attachmentfile);
            })
            this.setLoaing(false);
        } catch (error) {
            console.log(error);
            this.setLoaing(false);
        }
    }

    loadAttachmentfile = async (id:string) => {
        this.loading = true;
        let object:Attachmentfile;
        try {
            object = await agent.Attachmentfiles.details(id);
            this.setAttachmentfile(object);
            runInAction(()=>{
                this.selectedAttachmentfile = object;
            })
            this.setLoaing(false);
            return object;
        } catch (error) {
            console.log(error);
            this.setLoaing(false);
        }
        
    }


    updateAttachmentfile = async (object: Attachmentfile) => {
        this.loading = true;
        
        try {
            await agent.Attachmentfiles.update(object);
            runInAction(() => {
                this.AttachmentfileRegistry.set(object.id_file, object);
                this.selectedAttachmentfile = object;
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    

    
    deleteAttachmentfile = async (object: Attachmentfile) => {
        this.loading = true;
        
        try {
            await agent.Attachmentfiles.delete(object.id_file);
            runInAction(() => {
                this.AttachmentfileRegistry.delete(object.id_file);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    

    private setAttachmentfile = (attachmentfile : Attachmentfile) => {
        this.AttachmentfileRegistry.set(attachmentfile.id_file,attachmentfile);
    }

    private getActivity=(id:string) => {
        return this.AttachmentfileRegistry.get(id);
    }

    
    setLoaing = (state: boolean) => {
        this.loading = state;
    }


}