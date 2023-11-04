import { IsDate, IsEnum, IsNumber, IsOptional } from "class-validator";
class KidHealthDTO {
  @IsNumber()
  public kidId: number;

  @IsNumber()
  public weight: number;

  @IsNumber()
  public height: number;

  @IsOptional()
  @IsDate()
  public DOB: Date;

  @IsNumber()
  public PAL: number;

  @IsEnum(["female", "male"])
  public gender: string;

  @IsDate()
  public updatedAt: Date;

  constructor(
    kidId: number,
    weight: number,
    height: number,
    DOB: Date,
    PAL: number,
    gender: string,
    updatedAt: Date
  ) {
    this.kidId = kidId;
    this.weight = weight;
    this.height = height;
    this.DOB = DOB;
    this.PAL = PAL;
    this.gender = gender;
    this.updatedAt = updatedAt;
  }
}

export default KidHealthDTO;
