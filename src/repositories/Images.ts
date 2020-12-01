import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Image } from "../entities/Image";

@EntityRepository(Image)
class ImageRepository extends Repository<Image> {}
export default getCustomRepository(ImageRepository);
